import html2canvas from "html2canvas";
import { useRef, useState } from "react";

function DocCapture() {
  const [swiped, setSwiped] = useState(false);
  const [captured, setCaptured] = useState(null);
  const divRef = useRef(null);

  const handleMouseDown = () => setSwiped(true);

  const handleMouseUp = async () => {
    if (!swiped) return;
    setSwiped(false);
    if (!divRef.current) return;

    const canvas = await html2canvas(divRef.current, {
      scrollY: -window.scrollY,
      onclone: (clonedDoc) => {
        // resolve modern color functions (oklch etc.) to rgb(a) in the cloned document
        const resolveColor = (colorString) => {
          try {
            const tmp = clonedDoc.createElement("div");
            tmp.style.position = "fixed";
            tmp.style.opacity = "0";
            tmp.style.pointerEvents = "none";
            tmp.style.color = colorString;
            clonedDoc.documentElement.appendChild(tmp);
            const resolved = (clonedDoc.defaultView || window).getComputedStyle(
              tmp
            ).color;
            tmp.remove();
            return resolved || colorString;
          } catch (e) {
            return colorString;
          }
        };

        // 1) Rewrite same-origin stylesheet rules in the cloned document
        try {
          const sheets = Array.from(clonedDoc.styleSheets || []);
          for (const sheet of sheets) {
            let rules;
            try {
              rules = sheet.cssRules;
            } catch (e) {
              // cross-origin or inaccessible stylesheet — try to remove to avoid html2canvas parsing it
              try {
                if (sheet.ownerNode && sheet.ownerNode.parentNode) {
                  sheet.ownerNode.parentNode.removeChild(sheet.ownerNode);
                }
              } catch (ee) {}
              continue;
            }

            let newCss = "";
            for (let i = 0; i < rules.length; i++) {
              const rule = rules[i];
              if (rule.cssText && rule.cssText.includes("oklch(")) {
                const replaced = rule.cssText.replace(/oklch\([^\)]+\)/g, (m) =>
                  resolveColor(m)
                );
                newCss += replaced + "\n";
              }
            }

            if (newCss) {
              try {
                const tag = clonedDoc.createElement("style");
                tag.setAttribute("data-rewritten", "oklch");
                tag.textContent = newCss;
                clonedDoc.head.appendChild(tag);
                try {
                  if (sheet.ownerNode && sheet.ownerNode.parentNode) {
                    sheet.ownerNode.parentNode.removeChild(sheet.ownerNode);
                  }
                } catch (ee) {
                  try {
                    sheet.disabled = true;
                  } catch (e) {}
                }
              } catch (e) {}
            }
          }
        } catch (e) {}

        // 2) Fallback: rewrite a small set of likely color properties on elements
        try {
          const props = [
            "color",
            "background-color",
            "border-color",
            "outline-color",
            "box-shadow",
            "background",
          ];
          const elements = clonedDoc.querySelectorAll("*");
          elements.forEach((el) => {
            const cs = (clonedDoc.defaultView || window).getComputedStyle(el);
            props.forEach((prop) => {
              const val = cs.getPropertyValue(prop);
              if (val && val.includes("oklch(")) {
                const resolved = resolveColor(val);
                try {
                  el.style.setProperty(prop, resolved, "important");
                } catch (e) {}
              }
            });
          });
        } catch (e) {}
      },
    });

    const imgData = canvas.toDataURL("image/png");
    setCaptured(imgData);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div
        ref={divRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="w-96 p-6 bg-white rounded-2xl shadow-lg border  border-gray-300 cursor-crosshair select none"
      >
        <h2 className="text-xl font-semibold mb-2">My simple document</h2>
        <p>
          This area supports a mouse swipe-down gesture to capture a screenshot
          of the content. Click and drag your mouse downward inside this box to
          trigger the screenshot feature. This makes it easy to quickly capture
          and save what you see here.
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Built using React + html2canvas</li>
          <li>Captures only this div</li>
          <li>Triggered by swipe (mouse down + up)</li>
        </ul>
      </div>
      {captured && (
        <div className="w-150 h-120 mt-6">
          <h3 className="text-lg font-medium  mb-2"> ✂️ Captured Image</h3>
          <img
            src={captured}
            alt="Captured"
            className="rounded-lg shadow-md border"
          />
        </div>
      )}
    </div>
  );
}

export default DocCapture;
