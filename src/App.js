// todo 游標
// todo 64 編號 名稱

import React, { useState, useEffect, useRef } from "react";
import imgHypeCycle from "./images/790920_hypecycle.jpg";
import SVGRadarComponent from "./components/SVGRadarComponent";
import MyStep from "./components/MyStep";
import "./App.css";
import {
  filterKeys,
  extractTechIds,
  DivButton,
  HypeCycleListBlock,
  InnovationListBlock,
  transformInput,
} from "./components/CosWheel";
import uiContent from "./content/uiContent.json";

const activeStep = 1;
function App() {
  const [upload, setUpload] = useState(false);
  const [card1, setCard1] = useState(true);
  const [card2, setCard2] = useState(false);
  const [card3, setCard3] = useState(false);
  const [card4, setCard4] = useState(false);
  const [card5, setCard5] = useState(false);
  const [over, setOver] = useState(false);
  const [zone, setZone] = useState(0);
  const [hypeCycleSelect, setHypeCycleSelect] = useState(0);
  const [innovationSelect, setInnovationSelect] = useState(0);
  const [checkedState, setCheckedState] = useState({ 0: false });
  const [selectedValue, setSelectedValue] = useState("");
  const [surveyResult, setSurveyResult] = useState([]);
  const [allResult, setAllResult] = useState([]);
  const [gartnerTitles, setGartnerTitles] = useState([]);
  const [gartnerIndex, setGartnerIndex] = useState([]);
  const [innovationIndexs, setInnovationIndexs] = useState([]);
  const [innovationAllData, setInnovationAllData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [mediaQuery, setMediaQuery] = useState(230); // 預設值設為 230

  const [activeStep, setActiveStep] = useState(0);

  const staffId = useRef("");
  const staff_name_tw = useRef("");
  const type_index = useRef("");
  const question_reply_content = useRef([]);
  const [sqlHypecycle, setSqlHypecycle] = useState([
    { gartner_index: "", title: "", abstract_en: "" },
  ]);
  const [radarType, setRadarType] = useState([
    {
      type_index: "",
      title_tw: "",
      title_en: "",
      define: "",
      goal: "",
      hype_cycle_list: "",
    },
  ]);

  const Card1Intro = ({ title, onClick }) => {
    const [name, setName] = useState("");
    const [num, setNum] = useState("");
    return (
      <>
        <div className="flex flex-row">
          <div className="text-4xl font-bold">{title}</div>
          {/* <div className="text-4xl font-bold">{<MyStep />}</div> */}
        </div>
        <div
          style={{ overflowY: "auto" }}
          className="flex flex-1 p-4 gap-6 flex-wrap-reverse justify-center"
        >
          <div
            style={{ flex: 3, minWidth: "300px" }}
            className="flex flex-col justify-center gap-6 text-xl"
          >
            <div>{uiContent.step1.description}</div>
            {/* <div>{uiContent.step2.description["2"]}</div> */}
            {/* <div>{uiContent.step2.description["3"]}</div> */}
            {/* <div>{uiContent.step2.description["4"]}</div> */}
            {/* <div>{uiContent.step2.description["5"]}</div> */}
          </div>
          <div
            style={{ flex: 4, minWidth: "300px", minHeight: "400px" }}
            className="flex items-center justify-center"
          >
            <div
              style={{
                border: "1.5px solid rgba(0,0,0,0.1)",
                width: "80%",
                height: "80%",
              }}
              className="flex flex-col rounded-lg p-6 items-start justify-evenly shadow-md"
            >
              <div style={{ fontWeight: "revert" }} className="text-3xl">
                {"請填入基本資訊"}
              </div>
              <>
                <div className="mb text-2xl">{"姓名："}</div>
                <input
                  type="text"
                  className="bg-slate-200 w-full shadow-sm rounded-lg border-x-stone-300 p-2"
                  ref={staff_name_tw}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </>
              <>
                <div className="mb mt-6 text-2xl">{"工號："}</div>
                <input
                  type="text"
                  className="bg-slate-200 w-full shadow-sm rounded-lg border-x-stone-300 p-2"
                  ref={staffId}
                  value={num}
                  onChange={(e) => {
                    setNum(e.target.value);
                  }}
                />
              </>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-6">
          <DivButton
            bgColor={name != "" && num != "" ? "" : "gray"}
            text={"下一步"}
            onClick={onClick}
          />
        </div>
      </>
    );
  };

  const Card2ChoiceClass = ({ title, lastClick, nextClick, zone }) => {
    return (
      <>
        <div>
          <div className="text-4xl font-bold mb-2">{title}</div>
          <div
            style={{ flex: 3, minWidth: "300px" }}
            className="flex flex-col justify-center gap-6 text-xl mt-6"
          >
            <div>{uiContent.step2.description["1"]}</div>
            <div>{uiContent.step2.description["2"]}</div>
            <div>{uiContent.step2.description["3"]}</div>
            <div>{uiContent.step2.description["4"]}</div>
            <div>{uiContent.step2.description["5"]}</div>
          </div>
        </div>
        <div
          style={{ overflowY: "auto" }}
          className="flex-1 p-4 flex items-center flex-row gap-24 justify-center flex-wrap"
        >
          <div
            style={{
              position: "relative",
              cursor: "pointer",
            }}
            className=""
          >
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                left: "15%",
                top: "25%",
                fontSize: "1.5rem",
                fontWeight: "bolder",
                color: "white",
              }}
              onClick={() => {
                setZone(1);
              }}
            >
              創新研發
            </div>
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                left: "55%",
                top: "25%",
                fontSize: "32px",
                fontWeight: "bolder",
                color: "white",
              }}
              onClick={() => {
                setZone(4);
              }}
            >
              雲網服務
            </div>
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                left: "15%",
                top: "65%",
                fontSize: "32px",
                fontWeight: "bolder",
                color: "white",
              }}
              onClick={() => {
                setZone(2);
              }}
            >
              應用開發
            </div>
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                left: "55%",
                top: "65%",
                fontSize: "32px",
                fontWeight: "bolder",
                color: "white",
              }}
              onClick={() => {
                setZone(3);
              }}
            >
              系統運維
            </div>
            <SVGRadarComponent
              radius={mediaQuery}
              zone={zone}
              setZone={setZone}
            />
          </div>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              // maxWidth: "600px",
              width: "400px",
              minWidth: "300px",
            }}
            className="rounded-xl h-full flex flex-col px-10 py-16 flex-wrap"
          >
            {zone == 0 && (
              <div className="text-3xl font-bold">
                請於左側雷達圖選擇對應分類。
              </div>
            )}
            {radarType[zone - 1] && (
              <div className="text-xl font-semibold">定義：</div>
            )}
            {radarType[zone - 1] && (
              <div className="text-lg mb-16">
                {radarType[zone - 1]["define"]}
              </div>
            )}
            {radarType[zone - 1] && (
              <div className="text-xl font-semibold">目標：</div>
            )}
            {radarType[zone - 1] && (
              <div className="text-lg">{radarType[zone - 1]["goal"]}</div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-6">
          <DivButton text={"上一步"} onClick={lastClick} />
          <DivButton
            bgColor={zone == 0 ? "gray" : ""}
            text={"下一步"}
            onClick={nextClick}
          />
        </div>
      </>
    );
  };

  const Card5Submit = ({ title, lastClick, nextClick }) => {
    return (
      <>
        <div className="text-4xl font-bold">{title}</div>
        <div className="flex-1 p-4 flex flex-row h-3/4">
          <div
            style={{
              flex: 2,
              overflowY: "auto",
              borderLeft: "1.5px solid rgba(0,0,0,0.5)",
              borderRight: "1.5px solid rgba(0,0,0,0.5)",
              borderTop: "1.5px solid rgba(0,0,0,0.5)",
              borderBottom: "1.5px solid rgba(0,0,0,0.5)",
            }}
          >
            {gartnerTitles &&
              gartnerTitles.map((item, index) => {
                return (
                  <InnovationListBlock
                    key={index}
                    HypeCycleName={item}
                    onClick={() => {
                      setInnovationSelect(index);
                    }}
                    backgroundColor={
                      index === innovationSelect ? "rgba(0,0,0,0.2)" : ""
                    }
                  />
                );
              })}
          </div>
          <div
            style={{
              flex: 3,
              overflowY: "auto",
              borderBottom: "1.5px solid rgba(0,0,0,0.5)",
              borderRight: "1.5px solid rgba(0,0,0,0.5)",
              borderTop: "1.5px solid rgba(0,0,0,0.5)",
            }}
            className="flex flex-col p-4 bg-neutral-200 gap-3 text-xs"
          >
            {/* {JSON.stringify(innovationIndexs[innovationSelect])} */}
            {innovationAllData[innovationSelect] &&
              innovationAllData[innovationSelect]["TechList"].map(
                (item, index) => {
                  console.log(item, index, "##########");
                  // setCurrentTechId(index);
                  // setCurrentTechName(item["innovation_tech_name"]);
                  return (
                    <div
                      style={{ height: "200px", minHeight: "200px" }}
                      className="flex flex-col rounded-lg bg-slate-100 shadow-sm p-4 justify-between"
                    >
                      <div className="text-xl flex">
                        {item["innovation_tech_name"]}
                      </div>
                      <div
                        style={{ height: "120px" }}
                        className="flex flex-col"
                      >
                        <div
                          style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                          className="flex flex-1 justify-between"
                        >
                          <div
                            className="flex flex-1 items-center justify-center flex-col gap-4"
                            style={{
                              fontSize: "2em",
                              fontWeight: "normal",
                              borderTop: "1.3px solid rgba(0,0,0,0.5)",
                              borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                              borderLeft: "1.3px solid rgba(0,0,0,0.5)",
                              borderRight: "1.3px solid rgba(0,0,0,0.5)",
                            }}
                          >
                            <div>可行性</div>
                            <div>評分</div>
                          </div>
                          <div
                            className="flex-1 flex flex-col items-center justify-center pt-4"
                            style={{
                              borderTop: "1.3px solid rgba(0,0,0,0.5)",
                              borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                              borderRight: "1.3px solid rgba(0,0,0,0.5)",
                            }}
                          >
                            <div className="score-text">1 分</div>
                            <div className="text-3xl flex-1 flex items-center justify-center">
                              <input
                                type="radio"
                                name={item["innovation_tech_name"]}
                                checked={
                                  selectedValues?.[
                                    item["id"] + item["innovation_tech_name"]
                                  ]?.["utilizatio_level"] === "1"
                                }
                                onChange={() => {
                                  setSelectedValues({
                                    ...selectedValues,
                                    [item["id"] + item["innovation_tech_name"]]:
                                      {
                                        innovation_tech_id: item["id"],
                                        utilizatio_level: "1",
                                      },
                                  });
                                }}
                                value="1"
                                style={{
                                  transform: "scale(2)",
                                  margin: "10px",
                                }}
                                disabled={card5 ? true : false}
                              />
                            </div>
                          </div>
                          <div
                            className="flex-1 flex flex-col items-center justify-center pt-4"
                            style={{
                              borderTop: "1.3px solid rgba(0,0,0,0.5)",
                              borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                              borderRight: "1.3px solid rgba(0,0,0,0.5)",
                            }}
                          >
                            <div className="score-text">2 分</div>
                            <div className="text-3xl flex-1 flex items-center justify-center">
                              <input
                                type="radio"
                                name={item["innovation_tech_name"]}
                                checked={
                                  selectedValues?.[
                                    item["id"] + item["innovation_tech_name"]
                                  ]?.["utilizatio_level"] === "2"
                                }
                                onChange={() => {
                                  setSelectedValues({
                                    ...selectedValues,
                                    [item["id"] + item["innovation_tech_name"]]:
                                      {
                                        innovation_tech_id: item["id"],
                                        utilizatio_level: "2",
                                      },
                                  });
                                }}
                                value="2"
                                style={{
                                  transform: "scale(2)",
                                  margin: "10px",
                                }}
                                disabled={card5 ? true : false}
                              />
                            </div>
                          </div>
                          <div
                            className="flex-1 flex flex-col items-center justify-center pt-4"
                            style={{
                              borderTop: "1.3px solid rgba(0,0,0,0.5)",
                              borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                              borderRight: "1.3px solid rgba(0,0,0,0.5)",
                            }}
                          >
                            <div className="score-text">3 分</div>
                            <div className="text-3xl flex-1 flex items-center justify-center">
                              <input
                                type="radio"
                                name={item["innovation_tech_name"]}
                                checked={
                                  selectedValues?.[
                                    item["id"] + item["innovation_tech_name"]
                                  ]?.["utilizatio_level"] === "3"
                                }
                                onChange={() => {
                                  setSelectedValues({
                                    ...selectedValues,
                                    [item["id"] + item["innovation_tech_name"]]:
                                      {
                                        innovation_tech_id: item["id"],
                                        utilizatio_level: "3",
                                      },
                                  });
                                }}
                                value="3"
                                style={{
                                  transform: "scale(2)",
                                  margin: "10px",
                                }}
                                disabled={card5 ? true : false}
                              />
                            </div>
                          </div>
                          <div
                            className="flex-1 flex flex-col items-center justify-center pt-4"
                            style={{
                              borderTop: "1.3px solid rgba(0,0,0,0.5)",
                              borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                              borderRight: "1.3px solid rgba(0,0,0,0.5)",
                            }}
                          >
                            <div className="score-text">4 分</div>
                            <div className="text-3xl flex-1 flex items-center justify-center">
                              <input
                                type="radio"
                                name={item["innovation_tech_name"]}
                                checked={
                                  selectedValues?.[
                                    item["id"] + item["innovation_tech_name"]
                                  ]?.["utilizatio_level"] === "4"
                                }
                                onChange={() => {
                                  setSelectedValues({
                                    ...selectedValues,
                                    [item["id"] + item["innovation_tech_name"]]:
                                      {
                                        innovation_tech_id: item["id"],
                                        utilizatio_level: "4",
                                      },
                                  });
                                }}
                                value="4"
                                style={{
                                  transform: "scale(2)",
                                  margin: "10px",
                                }}
                                disabled={card5 ? true : false}
                              />
                            </div>
                          </div>
                          <div
                            className="flex-1 flex flex-col items-center justify-center pt-4"
                            style={{
                              borderTop: "1.3px solid rgba(0,0,0,0.5)",
                              borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                              borderRight: "1.3px solid rgba(0,0,0,0.5)",
                            }}
                          >
                            <div className="score-text">5 分</div>
                            <div className="text-3xl flex-1 flex items-center justify-center">
                              <input
                                type="radio"
                                name={item["innovation_tech_name"]}
                                checked={
                                  selectedValues?.[
                                    item["id"] + item["innovation_tech_name"]
                                  ]?.["utilizatio_level"] === "5"
                                }
                                onChange={() => {
                                  setSelectedValues({
                                    ...selectedValues,
                                    [item["id"] + item["innovation_tech_name"]]:
                                      {
                                        innovation_tech_id: item["id"],
                                        utilizatio_level: "5",
                                      },
                                  });
                                }}
                                value="5"
                                style={{
                                  transform: "scale(2)",
                                  margin: "10px",
                                }}
                                disabled={card5 ? true : false}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
        <div className="flex justify-end gap-6">
          <DivButton text={"上一步"} onClick={lastClick} />
          <DivButton
            text={"上傳問卷"}
            onClick={() => {
              setUpload(true);
              handleSubmit("123", "timmy", "H001", "JSON");
            }}
          />
        </div>
        {/* {upload && <div style={{back}} className="w-screen h-screen"></div>} */}
      </>
    );
  };

  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth < 800) {
        setMediaQuery(150);
      } else {
        setMediaQuery(200); // 其他情況，設置 radius 為 230
      }
    };
    window.addEventListener("resize", checkSize);
    checkSize();
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    setAllResult((pre) => [...pre, surveyResult]);
  }, [surveyResult]);

  useEffect(() => {
    if (card2) {
      fetch("http://20.28.192.182:3000/radartype")
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setRadarType(result);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [card2]);

  useEffect(() => {
    if (card3) {
      fetch("http://20.28.192.182:3000/hypecyclelist")
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setSqlHypecycle(result); // 將獲取的數據設置到狀態中
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [card3]);

  useEffect(() => {
    if (card4) {
      console.log("card4");
      filterKeys(checkedState).map((item, index) => {
        setGartnerTitles((pre) => [...pre, sqlHypecycle[item]["title"]]);
        setGartnerIndex((pre) => [...pre, sqlHypecycle[item]["gartner_index"]]);
        setInnovationIndexs((pre) => [
          ...pre,
          extractTechIds(sqlHypecycle[item]["use_tech_list_json"]),
        ]);
      });
    }
  }, [card4]);

  useEffect(() => {
    const arrayToString = (arr) => {
      return `(${arr.join(",")})`;
    };
    let i = 0;
    while (i < innovationIndexs.length) {
      fetch(
        `http://20.28.192.182:3000/innovationtechs?innovationIndex=${arrayToString(
          innovationIndexs[i]
        )}`
      )
        .then((response) => response.json())
        .then((result) => {
          setInnovationAllData((pre) => [
            ...pre,
            {
              HypeCycleName: gartnerTitles[i],
              TechList: result,
            },
          ]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      i++;
    }
  }, [innovationIndexs]);

  useEffect(() => {
    console.log(transformInput(checkedState).length, "~~~~~~~~~~~~~");
  }, [checkedState]);

  const handleSubmit = async (
    staff_id,
    staff_name_tw,
    type_index,
    question_reply_content
  ) => {
    try {
      const response = await fetch(
        `http://20.28.192.182:3000/submit?staff_id=${staff_id}&staff_name_tw=${staff_name_tw}&type_index=${type_index}&question_reply_content=${question_reply_content}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        console.log("Survey submitted successfully");
        // 處理成功響應
      } else {
        console.error("Failed to submit survey");
        // 處理錯誤響應
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [nowCard, setnowCard] = useState(0);

  return (
    <div className="flex-col h-screen bg-slate-500 flex items-center justify-center">
      <MyStep curStep={nowCard} />
      <div
        style={{ width: "90%", height: "90%" }}
        className="flex flex-col bg-slate-50 rounded-xl p-6 gap-2 shadow-2xl"
      >
        {card1 && (
          <Card1Intro
            title={uiContent.step1.title}
            onClick={() => {
              setCard1(false);
              setCard2(true);
              setCard3(false);
              setCard4(false);
              setnowCard(2);
            }}
          />
        )}
        {card2 && (
          <Card2ChoiceClass
            title={uiContent.step2.title}
            lastClick={() => {
              setCard1(true);
              setCard2(false);
              setCard3(false);
              setCard4(false);
              setZone(0);
            }}
            nextClick={() => {
              setCard1(false);
              setCard2(false);
              setCard3(true);
              setCard4(false);
              setnowCard(3);
            }}
            zone={zone}
          />
        )}
        {card3 && (
          <>
            <div className="text-4xl font-bold">{"專家評估－Hype Cycle"}</div>
            <div className="flex-1 p-4 flex flex-row h-3/4">
              <div
                style={{
                  flex: 2,
                  overflowY: "auto",
                  borderLeft: "1.5px solid rgba(0,0,0,0.5)",
                  borderRight: "1.5px solid rgba(0,0,0,0.5)",
                  borderTop: "1.5px solid rgba(0,0,0,0.5)",
                  borderBottom: "1.5px solid rgba(0,0,0,0.5)",
                }}
              >
                {sqlHypecycle &&
                  sqlHypecycle.map((item, index) => {
                    // console.log(item);
                    return (
                      <HypeCycleListBlock
                        key={index}
                        hypeCycleTitle={item.title}
                        onClick={() => {
                          setHypeCycleSelect(index);
                        }}
                        backgroundColor={
                          index === hypeCycleSelect ? "rgba(0,0,0,0.2)" : ""
                        }
                        id={index}
                        checkedState={checkedState}
                        setCheckedState={setCheckedState}
                      />
                    );
                  })}
              </div>
              <div
                style={{
                  flex: 3,
                  overflowY: "auto",
                  borderBottom: "1.5px solid rgba(0,0,0,0.5)",
                  borderRight: "1.5px solid rgba(0,0,0,0.5)",
                  borderTop: "1.5px solid rgba(0,0,0,0.5)",
                }}
                className="flex flex-col p-4 bg-neutral-200 gap-3"
              >
                <div>{sqlHypecycle[hypeCycleSelect]["title"]}</div>
                <div>{sqlHypecycle[hypeCycleSelect]["gartner_index"]}</div>
                <div>{sqlHypecycle[hypeCycleSelect]["abstract_en"]}</div>
                <div>{sqlHypecycle[hypeCycleSelect]["abstract_tw"]}</div>
                {/* <div>{sqlHypecycle[hypeCycleSelect]["releaseDate"]}</div> */}
                <img src={imgHypeCycle} alt="描述" />
              </div>
            </div>
            <div className="flex justify-end gap-6">
              {/* {"測試：" + JSON.stringify(filterKeys(checkedState))} */}
              <DivButton
                text={"上一步"}
                onClick={() => {
                  setCard1(false);
                  setCard2(true);
                  setCard3(false);
                  setCard4(false);
                }}
              />
              <DivButton
                bgColor={filterKeys(checkedState).length > 0 ? "" : "gray"}
                text={"下一步"}
                onClick={() => {
                  setCard1(false);
                  setCard2(false);
                  setCard3(false);
                  setCard4(true);
                  setnowCard(4);
                }}
              />
            </div>
          </>
        )}
        {card4 && (
          <>
            <div className="text-4xl font-bold">
              {"專家評估－Innovation Tech"}
            </div>
            <div className="flex-1 p-4 flex flex-row h-3/4">
              <div
                style={{
                  flex: 2,
                  overflowY: "auto",
                  borderLeft: "1.5px solid rgba(0,0,0,0.5)",
                  borderRight: "1.5px solid rgba(0,0,0,0.5)",
                  borderTop: "1.5px solid rgba(0,0,0,0.5)",
                  borderBottom: "1.5px solid rgba(0,0,0,0.5)",
                }}
              >
                {gartnerTitles &&
                  gartnerTitles.map((item, index) => {
                    return (
                      <InnovationListBlock
                        key={index}
                        HypeCycleName={item}
                        onClick={() => {
                          setInnovationSelect(index);
                        }}
                        backgroundColor={
                          index === innovationSelect ? "rgba(0,0,0,0.2)" : ""
                        }
                      />
                    );
                  })}
              </div>
              <div
                style={{
                  flex: 3,
                  overflowY: "auto",
                  borderBottom: "1.5px solid rgba(0,0,0,0.5)",
                  borderRight: "1.5px solid rgba(0,0,0,0.5)",
                  borderTop: "1.5px solid rgba(0,0,0,0.5)",
                }}
                className="flex flex-col p-4 bg-neutral-200 gap-3 text-xs"
              >
                {/* {JSON.stringify(innovationIndexs[innovationSelect])} */}
                {innovationAllData[innovationSelect] &&
                  innovationAllData[innovationSelect]["TechList"].map(
                    (item, index) => {
                      // console.log(item, index, "##########");
                      // setCurrentTechId(index);
                      // setCurrentTechName(item["innovation_tech_name"]);
                      return (
                        <div
                          style={{ height: "450px", minHeight: "450px" }}
                          className="flex flex-col rounded-lg bg-slate-100 shadow-sm p-4"
                        >
                          <div
                            style={{ flex: 5 }}
                            className="flex flex-col gap-6"
                          >
                            <div className="text-xl flex">
                              {item["innovation_tech_name"]}
                            </div>
                            <div className="text-base flex">
                              {item["definition"]}
                            </div>
                            <div className="text-lg flex flex-row gap-12 ">
                              <div>{item["maturity"]}</div>
                              <div>{item["position"]}</div>
                              <div>{item["time_to_plateau"]}</div>
                            </div>
                          </div>
                          <div style={{ flex: 2 }} className="flex flex-col">
                            <div
                              style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                              className="flex flex-1 justify-between"
                            >
                              <div
                                className="flex flex-1 items-center justify-center flex-col gap-4"
                                style={{
                                  fontSize: "2em",
                                  fontWeight: "normal",
                                  borderTop: "1.3px solid rgba(0,0,0,0.5)",
                                  borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                                  borderLeft: "1.3px solid rgba(0,0,0,0.5)",
                                  borderRight: "1.3px solid rgba(0,0,0,0.5)",
                                }}
                              >
                                <div>可行性</div>
                                <div>評分</div>
                              </div>
                              <div
                                className="flex-1 flex flex-col items-center justify-center pt-4"
                                style={{
                                  borderTop: "1.3px solid rgba(0,0,0,0.5)",
                                  borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                                  borderRight: "1.3px solid rgba(0,0,0,0.5)",
                                }}
                              >
                                <div className="score-text">1 分</div>
                                <div className="text-3xl flex-1 flex items-center justify-center">
                                  <input
                                    type="radio"
                                    name={item["innovation_tech_name"]}
                                    checked={
                                      selectedValues?.[
                                        item["id"] +
                                          item["innovation_tech_name"]
                                      ]?.["utilizatio_level"] === "1"
                                    }
                                    onChange={() => {
                                      setSelectedValues({
                                        ...selectedValues,
                                        [item["id"] +
                                        item["innovation_tech_name"]]: {
                                          innovation_tech_id: item["id"],
                                          utilizatio_level: "1",
                                        },
                                      });
                                    }}
                                    value="1"
                                    style={{
                                      transform: "scale(2)",
                                      margin: "10px",
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                className="flex-1 flex flex-col items-center justify-center pt-4"
                                style={{
                                  borderTop: "1.3px solid rgba(0,0,0,0.5)",
                                  borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                                  borderRight: "1.3px solid rgba(0,0,0,0.5)",
                                }}
                              >
                                <div className="score-text">2 分</div>
                                <div className="text-3xl flex-1 flex items-center justify-center">
                                  <input
                                    type="radio"
                                    name={item["innovation_tech_name"]}
                                    checked={
                                      selectedValues?.[
                                        item["id"] +
                                          item["innovation_tech_name"]
                                      ]?.["utilizatio_level"] === "2"
                                    }
                                    onChange={() => {
                                      setSelectedValues({
                                        ...selectedValues,
                                        [item["id"] +
                                        item["innovation_tech_name"]]: {
                                          innovation_tech_id: item["id"],
                                          utilizatio_level: "2",
                                        },
                                      });
                                    }}
                                    value="2"
                                    style={{
                                      transform: "scale(2)",
                                      margin: "10px",
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                className="flex-1 flex flex-col items-center justify-center pt-4"
                                style={{
                                  borderTop: "1.3px solid rgba(0,0,0,0.5)",
                                  borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                                  borderRight: "1.3px solid rgba(0,0,0,0.5)",
                                }}
                              >
                                <div className="score-text">3 分</div>
                                <div className="text-3xl flex-1 flex items-center justify-center">
                                  <input
                                    type="radio"
                                    name={item["innovation_tech_name"]}
                                    checked={
                                      selectedValues?.[
                                        item["id"] +
                                          item["innovation_tech_name"]
                                      ]?.["utilizatio_level"] === "3"
                                    }
                                    onChange={() => {
                                      setSelectedValues({
                                        ...selectedValues,
                                        [item["id"] +
                                        item["innovation_tech_name"]]: {
                                          innovation_tech_id: item["id"],
                                          utilizatio_level: "3",
                                        },
                                      });
                                    }}
                                    value="3"
                                    style={{
                                      transform: "scale(2)",
                                      margin: "10px",
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                className="flex-1 flex flex-col items-center justify-center pt-4"
                                style={{
                                  borderTop: "1.3px solid rgba(0,0,0,0.5)",
                                  borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                                  borderRight: "1.3px solid rgba(0,0,0,0.5)",
                                }}
                              >
                                <div className="score-text">4 分</div>
                                <div className="text-3xl flex-1 flex items-center justify-center">
                                  <input
                                    type="radio"
                                    name={item["innovation_tech_name"]}
                                    checked={
                                      selectedValues?.[
                                        item["id"] +
                                          item["innovation_tech_name"]
                                      ]?.["utilizatio_level"] === "4"
                                    }
                                    onChange={() => {
                                      setSelectedValues({
                                        ...selectedValues,
                                        [item["id"] +
                                        item["innovation_tech_name"]]: {
                                          innovation_tech_id: item["id"],
                                          utilizatio_level: "4",
                                        },
                                      });
                                    }}
                                    value="4"
                                    style={{
                                      transform: "scale(2)",
                                      margin: "10px",
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                className="flex-1 flex flex-col items-center justify-center pt-4"
                                style={{
                                  borderTop: "1.3px solid rgba(0,0,0,0.5)",
                                  borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                                  borderRight: "1.3px solid rgba(0,0,0,0.5)",
                                }}
                              >
                                <div className="score-text">5 分</div>
                                <div className="text-3xl flex-1 flex items-center justify-center">
                                  <input
                                    type="radio"
                                    name={item["innovation_tech_name"]}
                                    checked={
                                      selectedValues?.[
                                        item["id"] +
                                          item["innovation_tech_name"]
                                      ]?.["utilizatio_level"] === "5"
                                    }
                                    onChange={() => {
                                      setSelectedValues({
                                        ...selectedValues,
                                        [item["id"] +
                                        item["innovation_tech_name"]]: {
                                          innovation_tech_id: item["id"],
                                          utilizatio_level: "5",
                                        },
                                      });
                                    }}
                                    value="5"
                                    style={{
                                      transform: "scale(2)",
                                      margin: "10px",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
            <div className="flex justify-end gap-6">
              {/* {"測試：" + JSON.stringify(transformInput(selectedValues))} */}
              <DivButton
                text={"上一步"}
                onClick={() => {
                  setCard1(false);
                  setCard2(false);
                  setCard3(true);
                  setCard4(false);
                  setCard5(false);
                  setGartnerTitles([]);
                  setInnovationIndexs([]);
                }}
              />
              <DivButton
                text={"下一步"}
                onClick={() => {
                  setCard1(false);
                  setCard2(false);
                  setCard3(false);
                  setCard4(false);
                  setCard5(true);
                  setnowCard(4);
                }}
              />
            </div>
          </>
        )}
        {card5 && (
          <Card5Submit
            title={uiContent.step5.title}
            lastClick={() => {
              setCard1(false);
              setCard2(false);
              setCard3(false);
              setCard4(true);
              setCard5(false);
            }}
            nextClick={() => {
              setCard1(false);
              setCard2(false);
              setCard3(false);
              setCard4(false);
              setCard5(false);
              setOver(true);
              setnowCard(4);
            }}
          />
        )}
        {over && <div></div>}
      </div>
    </div>
  );
}

export default App;
