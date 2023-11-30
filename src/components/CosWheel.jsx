export function filterKeys(obj) {
  return Object.keys(obj).filter((key) => obj[key]);
}

/**
 * 解決 JSON 格式內數字字串問題
 * ex. 2,3,4,5 ==> [2,3,4,5]
 * @param {string} input
 * @returns []
 */
export function extractTechIds(input) {
  // 使用正則表達式匹配所有的 tech_id 數字
  let regex = /"tech_id":(\[?[\d,]+\]?)/g;
  let matches;
  let techIds = [];
  // 使用迴圈找出所有匹配的數字
  while ((matches = regex.exec(input)) !== null) {
    // 移除方括號（如果有的話）並分割數字
    let ids = matches[1].replace(/[\[\]]/g, "").split(",");
    // 將數字加入 techIds 陣列
    ids.forEach((id) => {
      if (id.trim() !== "") {
        techIds.push(parseInt(id.trim()));
      }
    });
  }
  return techIds;
}

export function DivButton({ text, bgColor, onClick }) {
  return (
    <div
      style={{ background: bgColor, pointerEvents: !bgColor ? "" : "none" }}
      className="div-button"
      onClick={onClick}
      role="button"
      tabIndex="0"
    >
      {text}
    </div>
  );
}

export function HypeCycleListBlock({
  id,
  hypeCycleTitle,
  onClick,
  backgroundColor,
  checkedState,
  setCheckedState,
}) {
  return (
    <div onClick={onClick}>
      <div
        style={{
          backgroundColor: backgroundColor,
          borderBottom: "1.5px solid rgba(0,0,0,0.5)",
        }}
        className="w-full h-20 flex gap-3 items-center flex-row px-2"
      >
        <input
          style={{ width: "20px", height: "20px" }}
          type="checkbox"
          name={id}
          checked={checkedState[id]}
          onChange={(e) => {
            setCheckedState({
              ...checkedState,
              [e.target.name]: e.target.checked,
            });
          }}
        />
        <label className="text-sm">{hypeCycleTitle}</label>
      </div>
    </div>
  );
}

export function InnovationListBlock({
  HypeCycleName,
  onClick,
  backgroundColor,
}) {
  return (
    <div onClick={onClick}>
      <div
        style={{
          backgroundColor: backgroundColor,
          borderBottom: "1.5px solid rgba(0,0,0,0.5)",
        }}
        className="w-full h-20 flex gap-3 items-center flex-row px-2"
      >
        <label className="text-sm">{HypeCycleName}</label>
      </div>
    </div>
  );
}

export function transformInput(input) {
  const output = [];

  // 遍历输入对象的每个属性
  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      const item = input[key];
      output.push(item);
    }
  }

  return output;
}
