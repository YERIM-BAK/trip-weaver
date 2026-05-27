class showChar {
  pattern = [
    "brand-400",
    "cyan-700",
    "indigo-700",
    "seaform-700",
    "celery-700",
    "magenta-700",
    "red-700",
    "green-700",
    "orange-700",
    "gray-400",
  ];

  wrapClass = "shc-chart";

  bar_width = 20;
  bar_maxWidth = 100;

  // bar_color_default = "#4C7DFF";
  // bar_color_focus = "#0046FF";
  // bar_2_color_default = "#b6c0d1ff";
  // bar_2_color_focus = "#818DA2";
  // footer_text_color_default = "gray";
  // footer_text_color_focus = "black";

  font_family = "Digital One Shinhan";
  font_size = 12;
  font_weight = "lighter";
  font_tip_weight = "bold";

  // data_label_color_default = "#000";
  // data_label_2_color_default = "#000";

  // data_label_color_default_dark = "#fff";
  // data_label_2_color_default_dark = "#fff";

  //this.theme==="dark"?
  //
  label_y_color = "gray";
  label_x_color = "black";
  bar_color_default = "#4C7DFF";
  bar_color_focus = "#0046FF";
  bar_2_color_default = "#b6c0d1ff";
  bar_2_color_focus = "#818DA2";
  bar_border_color = "#E4E7EC";
  data_label_color_default = "black";
  data_label_2_color_default = "black";
  footer_text_color_default = "gray";
  footer_text_color_focus = "black";

  label_y_color_dark = "gray";
  label_x_color_dark = "#E4E7EC";
  bar_color_default_dark = "#4C7DFF";
  bar_color_focus_dark = "#0046FF";
  bar_2_color_default_dark = "#b6c0d1ff";
  bar_2_color_focus_dark = "#818DA2";
  bar_border_color_dark = "#344054FF";
  data_label_color_default_dark = "#fff";
  data_label_2_color_default_dark = "#fff";
  footer_text_color_default_dark = "gray";
  footer_text_color_focus_dark = "#fff";

  lastIdx = 0;
  focusFix = "y";

  constructor() {}

  init() {
    document.removeEventListener("theme", theme);
    document.addEventListener("theme", theme);
    function theme() {
      Object.values(Chart.instances).forEach((chart) => {
        chart.update();
      });
    }

    //
    this.flush();
  }

  update(option = { query: "", json: null }) {
    if (!option.query || !option.json) return;

    let target = null;

    //
    if (typeof option.query === "object") {
      target = option.query;
    } else if (option.query.startsWith(".") || option.query.startsWith("#")) {
      target = document.querySelector(option.query);
    }

    const script = document.createElement("script");
    script.setAttribute("type", "application/json");
    script.textContent = JSON.stringify(option.json, null, 2);
    target.innerHTML = "";
    target.appendChild(script);

    this.flush();
  }

  flush() {
    document.querySelectorAll(`.${this.wrapClass}`).forEach((itm) => {
      try {
        if (itm.querySelector("script")) {
          const _scrEl = itm.querySelector("script");
          const json = JSON.parse((_scrEl != null ? _scrEl.innerText : "").trim());

          if (json.barWidth != undefined) this.bar_width = json.barWidth;
          if (json.barMaxWidth != undefined) this.bar_maxWidth = json.barMaxWidth;

          if (json.barColor != undefined) this.bar_color_default = json.barColor;
          if (json.barColorFocus != undefined) this.bar_color_focus = json.barColorFocus;
          if (json.barColor02 != undefined) this.bar_2_color_default = json.barColor02;
          if (json.barColorFocus02 != undefined) this.bar_2_color_focus = json.barColorFocus02;
          if (json.barBorderColor != undefined) this.bar_border_color = json.barBorderColor;
          if (json.dataLabelColor != undefined) this.data_label_color_default = json.dataLabelColor;
          if (json.dataLabelColor02 != undefined) this.data_label_2_color_default = json.dataLabelColor02;
          if (json.fontColor != undefined) this.footer_text_color_default = json.fontColor;
          if (json.fontColorFocus != undefined) this.footer_text_color_focus = json.fontColorFocus;
          if (json.barColorDark != undefined) this.bar_color_default_dark = json.barColorDark;
          if (json.barColorFocusDark != undefined) this.bar_color_focus_dark = json.barColorFocusDark;
          if (json.barColor02Dark != undefined) this.bar_2_color_default_dark = json.barColor02Dark;
          if (json.barColorFocus02Dark != undefined) this.bar_2_color_focus_dark = json.barColorFocus02Dark;
          if (json.barBorderColorDark != undefined) this.bar_border_color_dark = json.barBorderColorDark;
          if (json.dataLabelColorDark != undefined) this.data_label_color_default_dark = json.dataLabelColorDark;
          if (json.dataLabelColor02Dark != undefined) this.data_label_2_color_default_dark = json.dataLabelColor02Dark;
          if (json.fontColorDark != undefined) this.footer_text_color_default_dark = json.fontColorDark;
          if (json.fontColorFocusDark != undefined) this.footer_text_color_focus_dark = json.fontColorFocusDark;

          if (json.fontFamily != undefined) this.font_family = json.fontFamily;
          if (json.fontSize != undefined) this.font_size = json.fontSize;
          //if (json.fontWeight != undefined) this.font_weight = json.fontWeight;

          if (itm.getAttribute("data-type") == "chart-bar") this.chartBar(itm, json);
          else if (itm.getAttribute("data-type") == "chart-line") this.chartLine(itm, json);
          else if (itm.getAttribute("data-type") == "chart-doughnut") this.chartDoughnut(itm, json);
          else if (itm.getAttribute("data-type") == "chart-vs") this.chartVS(itm, json);
          else if (itm.getAttribute("data-type") == "chart-bar-base-line") this.chartBarBaseLine(itm, json);
          else if (itm.getAttribute("data-type") == "chart-bar-stacked") this.chartBarStacked(itm, json);
        }
      } catch (error) {
        console.error("JSON 파싱 오류가 발생했습니다:", error);
      }
    });
  }

  setCanvasID() {
    return `cav-${Math.random().toString(36).substring(2, 9)}`;
  }

  replaceValWon(value = 0) {
    const baisc = "";

    // 값이 0이거나 유효하지 않으면 그대로 반환
    if (value === 0 || value === null || isNaN(value)) {
      return value;
    }

    // 1. 억 단위 (100,000,000) 이상
    if (Math.abs(value) >= 100000000) {
      // 소수점 한 자리까지 표시 후 '억' 단위 추가
      return (value / 100000000).toFixed(1) + "억" + baisc;
    }

    // 2. 천만 단위 (10,000,000) 이상
    if (Math.abs(value) >= 10000000) {
      return (value / 10000000).toFixed(1) + "천만" + baisc;
      //return (value / 10000).toLocaleString("ko-KR") + "만";
    }

    // 3. 백만 단위 (1,000,000) 이상
    if (Math.abs(value) >= 1000000) {
      // '만' 단위로 통합 (예: 500만)
      return (value / 10000).toLocaleString("ko-KR") + "만" + baisc;
    }

    // 4. 만 단위 (10,000) 이상
    if (Math.abs(value) >= 10000) {
      // '만' 단위로 표시 (예: 35만)
      return (value / 10000).toLocaleString("ko-KR") + "만" + baisc;
    }

    // 5. 만 단위 미만 (원본 값에 콤마만 추가)
    return value.toLocaleString("ko-KR") + baisc;
  }

  //toolTip
  externalTooltipHandler(context) {
    const { chart, tooltip } = context;
    const marginBottom = 10;

    let addTxt = "";
    if (chart.dataType == "%") addTxt = "%";
    else if (chart.dataType == "won") addTxt = "원";
    else if (chart.dataType) addTxt = chart.dataType;

    //const toolTipTarget = document.getElementById();

    // 툴팁 숨기기
    if (tooltip.opacity === 0) {
      //chart.toolTipTarget.style.opacity = 0;
      return;
    }

    // 툴팁 내용 구성
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b) => b.lines);

      let innerHtml = "";

      titleLines.forEach((_) => {
        if (chart.toolTipTarget.tooltipTitle.trim() != "")
          innerHtml += `<div class='shc-chart__tooltip-title'>${chart.toolTipTarget.tooltipTitle}</div>`;
      });

      bodyLines.forEach((body, i) => {
        const bodyText = Number(body[0].replace(/[^0-9.]/g, "")).toLocaleString();
        innerHtml += `<div class='shc-chart__tooltip-content'>${bodyText}${addTxt}</div>`;
      });

      // 내용 업데이트
      chart.toolTipTarget.innerHTML = innerHtml;
    }

    // 툴팁 위치 조정
    const { offsetLeft: canvasLeft, offsetTop: canvasTop } = chart.canvas;

    // 툴팁이 캔버스 내의 막대 위치로 이동하도록 설정
    chart.toolTipTarget.style.opacity = 1;
    chart.toolTipTarget.style.left =
      canvasLeft + tooltip.caretX - chart.toolTipTarget.getBoundingClientRect().width / 2 + "px";
    chart.toolTipTarget.style.top =
      canvasTop + tooltip.caretY - (chart.toolTipTarget.getBoundingClientRect().height + marginBottom) + "px";
  }

  setDefaultTooltip(chart, datasetIdx, dataIdx) {
    if (!chart.getDatasetMeta(datasetIdx).data[dataIdx]) return;

    // 활성 요소 설정 (막대나 포인트 강조)
    const activeElements = [
      {
        datasetIndex: datasetIdx,
        index: dataIdx,
      },
    ];

    chart.setActiveElements(activeElements);

    // 툴팁 위치 및 상태 강제 설정
    chart.tooltip.setActiveElements(activeElements, {
      x: chart.getDatasetMeta(datasetIdx).data[dataIdx].x,
      y: chart.getDatasetMeta(datasetIdx).data[dataIdx].y,
    });

    chart.update();
  }

  chageX_Tick(_chart_, hoverIndex = 0) {
    const xTicks = _chart_.options.scales.x.ticks;
    const numLabels = _chart_.data.labels.length;
    let updated = false;

    if (this.lastIdx !== undefined && hoverIndex >= 0) this.lastIdx = hoverIndex;

    for (let i = 0; i < numLabels; i++) {
      let newColor = this.theme === "dark" ? this.footer_text_color_default_dark : this.footer_text_color_default;

      if (i === hoverIndex) {
        newColor = this.theme === "dark" ? this.footer_text_color_focus_dark : this.footer_text_color_focus;
      }

      if (_chart_.focusIdx != undefined && i === _chart_.focusIdx) {
        newColor = this.theme === "dark" ? this.footer_text_color_focus_dark : this.footer_text_color_focus;
      }

      if (xTicks.color[i] !== newColor) {
        if (!Array.isArray(xTicks.color)) {
          xTicks.color = Array(numLabels).fill(
            this.theme === "dark" ? this.footer_text_color_default_dark : this.footer_text_color_default
          );
        }

        //xTicks.color[i] = newColor;
        if (hoverIndex < 0 && this.lastIdx >= 0)
          xTicks.color[this.lastIdx] =
            this.theme === "dark" ? this.footer_text_color_focus_dark : this.footer_text_color_focus;
        else xTicks.color[i] = newColor;

        updated = true;
      }
    }

    if (updated) {
      _chart_.update();
    }
  }

  setEvent(event, elements, chart) {
    let hoverIndex = -1;

    if (elements.length) {
      hoverIndex = elements[0].index;
    }

    //toolTip이용시 backgroundColor 고정
    if (this.lastIdx >= 0 && this.focusFix === "n") {
      chart.data.datasets.forEach((_, idx) => {
        const dataLength = chart.data.datasets[idx].data.length;
        const backgroundColor = [];
        for (let i = 0; i < dataLength; i++) {
          if (this.lastIdx == i)
            backgroundColor.push(this.theme === "dark" ? this.bar_color_focus_dark : this.bar_color_focus);
          else backgroundColor.push(this.theme === "dark" ? this.bar_color_default_dark : this.bar_color_default);
        }
        chart.data.datasets[idx].backgroundColor = backgroundColor;
        chart.update();
      });
    }

    this.chageX_Tick(chart, hoverIndex);
  }
  chartBarStacked(obj, json) {
    const _this = this;

    obj.innerHTML = "";
    obj.style.height = (json.barHeight != null ? json.barHeight : 32) + "px";
    obj.style.width = "100%";
    obj.style.display = "flex";
    obj.style.borderRadius = (json.borderRadius != null ? json.borderRadius : 4) + "px";
    obj.style.overflow = "hidden";

    //data가 0일 경우를 대비해서 0.1씩 더해준다.
    Object.values(json.datas).map((item) => {
      item.data = Number(item.data) + 0.1;
    });

    const total = json.datas.reduce((a, b) => a + b.data, 0);
    const gapSize = json.gapSize != null ? json.gapSize : 1;
    const gapColor = json.gapColor != null ? json.gapColor : "#fff";

    json.datas.forEach((item, idx) => {
      // gap
      if (idx > 0) {
        const gap = document.createElement("div");
        gap.style.width = gapSize + "px";
        gap.style.flexShrink = "0";
        gap.style.backgroundColor = gapColor;
        obj.append(gap);
      }

      const bar = document.createElement("div");
      bar.style.flex = (item.data / total) * 100 + "%";
      bar.style.backgroundColor = item.color;
      bar.style.backgroundImage = `url( "${gfn.devServer() ? "" : "/pconts"}/static/svg/chart/${this.pattern[idx]}.svg")`;
      bar.style.height = "100%";
      obj.append(bar);
    });
  }

  barDraw = {
    id: "barDraw",
    afterDraw: function (chart, args, options) {
      //초기에 한번만 로드 하게 한다.
      if (chart.barDrawLoaded) return;

      function barDrawFocus() {
        this.chart.self.lastIdx = this.index;

        //onfocus
        this.chart.setActiveElements([
          {
            datasetIndex: 0,
            index: this.index,
          },
        ]);

        //tooltip
        if (this.chart.toolTipTarget) this.chart.self.setDefaultTooltip(this.chart, 0, this.index);

        this.chart.update();
      }

      const offset = 0;
      const obj = chart.canvas.parentNode;

      //접근성(1/3)
      chart.canvas.setAttribute("aria-hidden", "true");

      const targetClass = "tab-able-bar-draw";
      obj.querySelectorAll(`.${targetClass}`).forEach((itm) => {
        itm.remove();
      });

      chart.$datalabels._labels
        .sort((a, b) => a._index - b._index)
        .some((itm, idx) => {
          //chart.$datalabels._labels.reverse().some((itm,idx) => {

          const _data = itm._el;
          let bar = document.createElement("div");

          if (isNaN(_data.height)) return;

          //접근성(2/3)
          bar.setAttribute("role", "button");
          if (chart.data.labels[idx]) bar.setAttribute("aria-label", chart.data.labels[idx]);

          bar.classList.add(targetClass);
          bar.setAttribute("tabindex", "0");
          //bar.style.backgroundColor = "red";
          bar.style.position = "absolute";
          bar.style.width = _data.width + "px";
          bar.style.height = _data.height + "px";
          //bar.style.left = _data.x - offset - (_data.width/2) + "px";
          bar.style.marginLeft = _data.x - offset - _data.width / 2 + "px";
          bar.style.top = _data.y + "px";
          bar.style.zIndex = -1;
          obj.append(bar);

          bar.removeEventListener("focus", barDrawFocus);
          bar.addEventListener(
            "focus",
            barDrawFocus.bind({
              chart: chart,
              index: itm._index,
              bar: bar,
            })
          );

          //finish animation wait
          setTimeout(() => {
            chart.barDrawLoaded = true;
          }, 500);
        });

      function _replaceValWon(value = 0) {
        const baisc = "";

        // 값이 0이거나 유효하지 않으면 그대로 반환
        if (value === 0 || value === null || isNaN(value)) {
          return value;
        }

        // 1. 억 단위 (100,000,000) 이상
        if (Math.abs(value) >= 100000000) {
          // 소수점 한 자리까지 표시 후 '억' 단위 추가
          return (value / 100000000).toFixed(1) + "억" + baisc;
        }

        // 2. 천만 단위 (10,000,000) 이상
        if (Math.abs(value) >= 10000000) {
          return (value / 10000000).toFixed(1) + "천만" + baisc;
          //return (value / 10000).toLocaleString("ko-KR") + "만";
        }

        // 3. 백만 단위 (1,000,000) 이상
        if (Math.abs(value) >= 1000000) {
          // '만' 단위로 통합 (예: 500만)
          return (value / 10000).toLocaleString("ko-KR") + "만" + baisc;
        }

        // 4. 만 단위 (10,000) 이상
        if (Math.abs(value) >= 10000) {
          // '만' 단위로 표시 (예: 35만)
          return (value / 10000).toLocaleString("ko-KR") + "만" + baisc;
        }

        // 5. 만 단위 미만 (원본 값에 콤마만 추가)
        return value.toLocaleString("ko-KR") + baisc;
      }

      //접근성(3/3)
      const srOnly = "tab-able-sr-only";
      obj.querySelectorAll(`.${srOnly}`).forEach((itm) => {
        itm.remove();
      });

      if (chart.data.labels.length > 0) {
        const srOnlyDom = document.createElement("div");
        const srOnlyDomUL = document.createElement("ul");
        srOnlyDom.classList.add(srOnly);
        srOnlyDom.classList.add("sr-only");

        const _data = chart.data.datasets[0].data;
        chart.data.labels.some((label, idx) => {

          if( Array.isArray(label) ) label = label.join(" ");

          if (typeof label === "string" && label.startsWith("label")) return false;

          if (typeof _data[idx] === undefined) return false;

          const srOnlyDomLI = document.createElement("li");

          let _value = _data[idx];

          if (chart.dataType == "%") _value = _data[idx] + "%";
          else if (chart.dataType == "won") _value = _replaceValWon(_data[idx]) + "원";
          else if (chart.dataType) _value = _data[idx].toLocaleString("ko-KR") + chart.dataType;

          srOnlyDomLI.innerHTML = `${label} : ${_value}`;

          srOnlyDomUL.append(srOnlyDomLI);
        });

        if (srOnlyDomUL) {
          srOnlyDom.append(srOnlyDomUL);
          obj.append(srOnlyDom);
        }
      }

      //

      // chart.setActiveElements([
      //   {
      //     datasetIndex: 0, // 첫 번째 데이터셋
      //     index: 2,    // 강조하고 싶은 데이터의 인덱스
      //   }
      // ]);
      // chart.update(); // 차트 업데이트로 상태 반영
    },
  };

  /*
  bar
  */
  chartBar(obj, json) {
    const _this = this;

    const aniDuration = json.animationDuration || 0;
    const barPercentage = json.barMargin || 0.9;
    const categoryPercentage = json.groupMargin || 0.6;

    const dataType = json.dataType || "";
    const guideLineType = json.guideLineType || [];
    const guideLineTicks = json.guideLineType == [] ? true : false;
    const guideStep = json.guideStep || 0;
    const guideLine = json.guideLine == "y" ? true : false;
    const guideLabel = json.guideLabel == "y" ? true : false;
    const barTag = json.barTag == "y" ? true : false;
    const dataTip = json.dataTip == "y" ? true : false;

    const eventTrigger = (json.trigger === "click" ? ["click"] : ["mousemove", "mouseout"]) || [
      "mousemove",
      "mouseout",
    ];

    //
    const canvasId = this.setCanvasID();
    const _canvas = document.createElement("canvas");
    _canvas.id = canvasId;

    _this.theme = document.documentElement.getAttribute("data-theme");

    //flush
    obj.innerHTML = "";
    obj.append(_canvas);
    //set toolTip
    let tooltipEl = null;

    if (json.toolTipTitle != undefined && json.toolTipTitle != "") {
      tooltipEl = document.createElement("div");
      tooltipEl.className = "chart-bar-tooltip";
      tooltipEl.tooltipTitle = json.toolTipTitle || "";
      obj.append(tooltipEl);
    }

    let dataList = null;
    if (dataTip) {
      dataList = document.createElement("div");
      dataList.className = "data-list";
      obj.append(dataList);
    }

    const nextDraw = {
      id: "nextDraw",
      afterDraw: function (chart, args, options) {},
    };

    //최대 2개로 제한
    const data = {
      labels: ["labelA", "labelB", "labelC", "labelD"],
      datasets: [
        {
          label: "tipA",
          data: [10, 20, 30, 40],

          backgroundColor: [this.bar_color_default],
          borderColor: [this.bar_color_default],
          hoverBackgroundColor: [this.bar_color_focus],

          barPercentage: barPercentage,
          categoryPercentage: categoryPercentage,

          borderWidth: 0,
          barThickness: this.bar_width,
          maxBarThickness: this.bar_maxWidth,
          borderRadius: {
            topLeft: 4,
            topRight: 4,
            bottomLeft: 0,
            bottomRight: 0,
          },
          minBarLength: 2,
        },
        {
          label: "tipB",
          data: [40, 30, 20, 10],

          backgroundColor: [this.bar_2_color_default],
          borderColor: [this.bar_2_color_default],
          hoverBackgroundColor: [this.bar_2_color_focus],

          barPercentage: barPercentage,
          categoryPercentage: categoryPercentage,

          borderWidth: 0,
          barThickness: this.bar_width,
          maxBarThickness: this.bar_maxWidth,
          borderRadius: {
            topLeft: 4,
            topRight: 4,
            bottomLeft: 0,
            bottomRight: 0,
          },
          minBarLength: 2,
        },
      ],
    };
    const x_font_size = json.x_font_size != null ? json.x_font_size : _this.font_size;
    const options = {
      //indexAxis: 'y',
      //animation: true,
      animation: {
        duration: aniDuration,
        onComplete: (context) => {
          const { chart } = context;
          if (_this.lastIdx != undefined) {
            _this.chageX_Tick(chart, _this.lastIdx);

            if (chart.toolTipTarget !== undefined) {
              setTimeout(() => {
                _this.setDefaultTooltip(chart, 0, _this.lastIdx);
              }, 100);
            }
          }
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 30,
          bottom: dataTip ? 30 : 0,
        },
      },
      plugins: {
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          display: barTag,
          formatter: function (value, context) {
            if (dataType == "%") return value + "%";
            else if (dataType == "won") return _this.replaceValWon(value);
            else if (dataType) return value.toLocaleString("ko-KR") + dataType;
            else return value;
          },
          anchor: "end",
          align: "top",
          offset: 0,
          color: function (context) {
            _this.theme = document.documentElement.getAttribute("data-theme");

            if (_this.theme === "dark") {
              if (context.datasetIndex == 0) return _this.data_label_color_default_dark;
              else return _this.data_label_2_color_default_dark;
            } else {
              if (context.datasetIndex == 0) return _this.data_label_color_default;
              else return _this.data_label_2_color_default;
            }
          },
          // ✅ 여기 핵심 (무조건 먹음)
          font: function () {
            const size = json.data_label_font_size != null ? json.data_label_font_size : _this.font_size; // ← JSON 키 여기!
            return {
              size,
              weight: 500,
              family: _this.font_family,
            };
          },
        },
      },
      scales: {
        x: {
          type: "category", // ✅ 이거 꼭 추가 (핵심)
          offset: true, // (선택) 라벨/막대 간격 자연스럽게
          grid: { display: false },

          ticks: {
            display: true,
            padding: 12,
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            color: function () {
              _this.theme = document.documentElement.getAttribute("data-theme");
              return _this.theme === "dark" ? _this.footer_text_color_default_dark : _this.footer_text_color_default;
            },
            callback: function (value, index) {
              const _labels = this.chart.data.labels;
              const raw = _labels != null ? _labels[index] : void 0;
              const text = Array.isArray(raw) ? raw.join("") : String(raw != null ? raw : value != null ? value : "");

              if (text.endsWith("이상")) return [text.replace("이상", ""), "이상"];
              if (text.endsWith("이하")) return [text.replace("이하", ""), "이하"];
              if (this.chart.width <= 320 && text.includes("~") && text.includes("만원")) {
                return [text.replace("만원", ""), "만원"];
              }

              return text;
            },

            font: {
              size: x_font_size,
              family: _this.font_family,
              weight: _this.font_weight,
            },
          },
          border: {
            display: guideLine ? false : true,
            color: function () {
              return _this.theme === "dark" ? _this.bar_border_color_dark : _this.bar_border_color;
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: guideLine,
            drawTicks: guideLineTicks,
            color: function () {
              return _this.theme === "dark" ? _this.bar_border_color_dark : _this.bar_border_color;
            },
          },
          ticks: {
            callback: function (value, index, ticks) {
              if (dataType == "%") return value + "%";
              else if (dataType == "won") return _this.replaceValWon(value);
              else if (dataType) return value.toLocaleString("ko-KR") + dataType;
              else return value;
            },
            stepSize: function () {
              if (guideStep > 0) return guideStep;
              else if (dataType == "%") return 10;
              else if (dataType == "won") return 50000000;
              else return 10;
            },
            min: 0,
            display: guideLabel,
            padding: 5,
          },
          border: {
            dash: function (context) {
              return context.index === 0 ? [] : guideLineType;
            },
            display: guideLabel,
          },
        },
      },
      events: eventTrigger,
      onHover: (event, elements, chart) => {
        this.setEvent(event, elements, chart);
      },
      onClick: (event, elements, chart) => {
        this.setEvent(event, elements, chart);
      },
    };

    //
    if (json.labels != undefined) data.labels = json.labels;
    if (json.focusFix != undefined) this.focusFix = json.focusFix;

    //set data
    data.datasets.forEach((_, idx) => {
      if (json.datas[idx] != undefined) {
        if (json.datas[idx].label != undefined) data.datasets[idx].label = json.datas[idx].label;
        if (json.datas[idx].data != undefined) data.datasets[idx].data = json.datas[idx].data;

        //defualt focus
        /**
         * focusFix !== "n"
         * focusIdx 의 색상을 고정한다.
         */
        if (json.focusIdx != undefined && this.focusFix === "y") {
          data.datasets[idx].backgroundColor = [];
          data.datasets[idx].borderColor = [];
          json.datas[idx].data.forEach((__, _idx) => {
            if (this.theme === "dark") {
              data.datasets[idx].backgroundColor.push(
                json.focusIdx == _idx ? this.bar_color_focus_dark : this.bar_color_default_dark
              );
              data.datasets[idx].borderColor.push(
                json.focusIdx == _idx ? this.bar_color_focus_dark : this.bar_color_default_dark
              );
            } else {
              data.datasets[idx].backgroundColor.push(
                json.focusIdx == _idx ? this.bar_color_focus : this.bar_color_default
              );
              data.datasets[idx].borderColor.push(
                json.focusIdx == _idx ? this.bar_color_focus : this.bar_color_default
              );
            }
          });
        }
      } else {
        delete data.datasets[idx];
      }
    });

    data.datasets.length = json.datas.length;

    //
    if (tooltipEl != null) {
      options.plugins.tooltip.external = this.externalTooltipHandler.bind(this);
      options.plugins.tooltip.enabled = false;
    }

    const _chart = new Chart(document.getElementById(canvasId), {
      type: "bar",
      data: data,
      options: options,
      plugins: [ChartDataLabels, nextDraw, this.barDraw],
    });

    //
    _chart.barDrawLoaded = false;
    _chart.self = this;

    if (tooltipEl != null) _chart.toolTipTarget = tooltipEl;
    if (json.focusIdx != undefined) _chart.focusIdx = json.focusIdx;

    if (json.focusIdx != undefined) {
      this.lastIdx = json.focusIdx;

      //개발에서 해당 스크립트가 있어야 작동됨
      this.chageX_Tick(_chart, json.focusIdx);
    }

    if (dataType) _chart.dataType = dataType;

    //data list
    if (dataTip) {
      dataList.innerHTML = "";
      data.datasets.forEach((itm, $idx) => {
        const _wrap = document.createElement("div");
        const _canvas = document.createElement("canvas");
        const _msg = document.createElement("span");

        _wrap.className = "list";
        _canvas.className = "pattern";
        _msg.className = "title";

        _canvas.width = 20;
        _canvas.height = 20;
        const ctx = _canvas.getContext("2d");
        ctx.beginPath();

        ctx.arc(10, 10, 10, 0, 2 * Math.PI);
        ctx.fillStyle = itm.borderColor;
        ctx.fill();

        // if (data.datasets[$idx].borderDash == "" || data.datasets[$idx].borderDash == "[]"){
        //   ctx.arc(10, 10, 10, 0, 2 * Math.PI);
        //   ctx.fillStyle = data.datasets[$idx].borderColor;
        //   ctx.fill();
        // }else{
        //    ctx.arc(10, 10, 7, 0, 2 * Math.PI);
        //   ctx.strokeStyle = data.datasets[$idx].borderColor;
        //   ctx.setLineDash([2,2]);
        //   ctx.lineWidth = 5;
        //   ctx.stroke();
        // }

        _msg.innerText = itm.label;

        _wrap.append(_canvas);
        _wrap.append(_msg);

        dataList.append(_wrap);
      });
    }
  }

  /*
  chartBarBaseLine
  */
  chartBarBaseLine(obj, json) {
    const _this = this;

    const barPercentage = json.barMargin || 0.9;
    const categoryPercentage = json.groupMargin || 0.6;

    const dataType = json.dataType || "";
    const guideLineType = json.guideLineType || [];
    const guideLineTicks = json.guideLineType == [] ? true : false;
    const guideStep = json.guideStep || 0;
    const guideLine = json.guideLine == "y" ? true : false;
    const guideLabel = json.guideLabel == "y" ? true : false;
    const barTag = json.barTag == "y" ? true : false;
    const dataTip = json.dataTip == "y" ? true : false;

    const eventTrigger = (json.trigger === "click" ? ["click"] : ["mousemove", "mouseout"]) || [
      "mousemove",
      "mouseout",
    ];

    const canvasId = this.setCanvasID();
    const _canvas = document.createElement("canvas");
    _canvas.id = canvasId;

    _this.theme = document.documentElement.getAttribute("data-theme");

    //flush
    obj.innerHTML = "";
    obj.append(_canvas);

    //set toolTip
    let tooltipEl = null;

    if (json.toolTipTitle != undefined && json.toolTipTitle != "") {
      tooltipEl = document.createElement("div");
      tooltipEl.className = "chart-bar-tooltip";
      tooltipEl.tooltipTitle = json.toolTipTitle || "";
      obj.append(tooltipEl);
    }

    let dataList = null;
    if (dataTip) {
      dataList = document.createElement("div");
      dataList.className = "data-list";
      obj.append(dataList);
    }

    const nextDraw = {
      id: "nextDraw",
      afterDraw: function (chart, args, options) {
        if (json.avgLine !== "y") return;

        const { ctx, chartArea, scales } = chart;

        const _jd0 = json.datas[0];
        const allData = _jd0 != null && _jd0.data != null ? _jd0.data : [];
        const avgValue = json.avgValue != null ? json.avgValue : allData.reduce((a, b) => a + b, 0) / allData.length;

        const y = scales.y.getPixelForValue(avgValue);
        _this.theme = document.documentElement.getAttribute("data-theme");
        const lineColor =
          _this.theme === "dark"
            ? json.avgLineColorDark != null
              ? json.avgLineColorDark
              : "#F8F9FC"
            : json.avgLineColor != null
              ? json.avgLineColor
              : "#101828";
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(chartArea.left, y);
        ctx.lineTo(chartArea.right, y);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = json.avgLineWidth != null ? json.avgLineWidth : 1;
        ctx.setLineDash(json.avgLineDash != null ? json.avgLineDash : []);
        ctx.stroke();
        ctx.restore();
      },
    };

    //최대 2개로 제한
    const data = {
      labels: ["labelA", "labelB", "labelC", "labelD"],
      datasets: [
        {
          label: "tipA",
          data: [10, 20, 30, 40],

          backgroundColor: [this.bar_color_default],
          borderColor: [this.bar_color_default],
          hoverBackgroundColor: [this.bar_color_focus],

          barPercentage: barPercentage,
          categoryPercentage: categoryPercentage,

          borderWidth: 0,
          barThickness: this.bar_width,
          maxBarThickness: this.bar_maxWidth,
          borderRadius: {
            topLeft: 4,
            topRight: 4,
            bottomLeft: 0,
            bottomRight: 0,
          },
          minBarLength: 2,
        },
        {
          label: "tipB",
          data: [40, 30, 20, 10],

          backgroundColor: [this.bar_2_color_default],
          borderColor: [this.bar_2_color_default],
          hoverBackgroundColor: [this.bar_2_color_focus],

          barPercentage: barPercentage,
          categoryPercentage: categoryPercentage,

          borderWidth: 0,
          barThickness: this.bar_width,
          maxBarThickness: this.bar_maxWidth,
          borderRadius: {
            topLeft: 4,
            topRight: 4,
            bottomLeft: 0,
            bottomRight: 0,
          },
          minBarLength: 2,
        },
      ],
    };
    const x_font_size = json.x_font_size != null ? json.x_font_size : _this.font_size;
    const _jds = json.datas;
    const _jds0 = _jds != null ? _jds[0] : void 0;
    const allData = _jds0 != null && _jds0.data != null ? _jds0.data : [];
    const maxIdx = allData.length ? allData.indexOf(Math.max(...allData)) : -1;
    const options = {
      //indexAxis: 'y',
      //animation: true,
      animation: {
        //duration: 0,
        onComplete: (context) => {
          const { chart } = context;
          if (_this.lastIdx != undefined) {
            // _this.chageX_Tick(chart, _this.lastIdx);

            if (chart.toolTipTarget !== undefined) {
              setTimeout(() => {
                _this.setDefaultTooltip(chart, 0, _this.lastIdx);
              }, 100);
            }
          }
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 30,
          bottom: dataTip ? 30 : 0,
        },
      },
      plugins: {
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          display: false,
          color: function (context) {
            _this.theme = document.documentElement.getAttribute("data-theme");
            if (_this.theme === "dark") {
              if (context.datasetIndex == 0) return _this.data_label_color_default_dark;
              else return _this.data_label_2_color_default_dark;
            } else {
              if (context.datasetIndex == 0) return _this.data_label_color_default;
              else return _this.data_label_2_color_default;
            }
          },
          font: function () {
            const size = json.data_label_font_size != null ? json.data_label_font_size : _this.font_size;
            return {
              size,
              weight: 500,
              family: _this.font_family,
            };
          },
        },
      },
      scales: {
        x: {
          type: "category",
          offset: true,
          grid: { display: false },

          ticks: {
            display: true,
            padding: 12,
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            color: function (context) {
              _this.theme = document.documentElement.getAttribute("data-theme");
              if (context.index === maxIdx) {
                const focusColor =
                  _this.theme === "dark"
                    ? json.fontColorFocusDark != null
                      ? json.fontColorFocusDark
                      : _this.footer_text_color_focus_dark
                    : json.fontColorFocus != null
                      ? json.fontColorFocus
                      : _this.footer_text_color_focus;
                return focusColor;
              }
              const defaultColor =
                _this.theme === "dark"
                  ? json.fontColorDark != null
                    ? json.fontColorDark
                    : _this.footer_text_color_default_dark
                  : json.fontColor != null
                    ? json.fontColor
                    : _this.footer_text_color_default;
              return defaultColor;
            },
            font: function (context) {
              return {
                size: x_font_size,
                family: _this.font_family,
                weight: context.index === maxIdx ? "bold" : _this.font_weight,
              };
            },
            callback: function (value, index) {
              const _labels = this.chart.data.labels;
              const raw = _labels != null ? _labels[index] : void 0;
              const text = Array.isArray(raw) ? raw.join("") : String(raw != null ? raw : value != null ? value : "");
              return text;
            },

            // font: {
            //   size: x_font_size,
            //   family: _this.font_family,
            //   weight: _this.font_weight,
            // },
          },
          border: {
            display: guideLine ? false : true,
            color: function () {
              return _this.theme === "dark" ? _this.bar_border_color_dark : _this.bar_border_color;
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: guideLine,
            drawTicks: guideLineTicks,
            color: function () {
              return _this.theme === "dark" ? _this.bar_border_color_dark : _this.bar_border_color;
            },
          },
          ticks: {
            min: 0,
            display: false,
            padding: 5,
          },
          border: {
            dash: function (context) {
              return context.index === 0 ? [] : guideLineType;
            },
            display: guideLabel,
          },
        },
      },
      events: eventTrigger,
      onHover: (event, elements, chart) => {
        this.setEvent(event, elements, chart);
      },
      onClick: (event, elements, chart) => {
        this.setEvent(event, elements, chart);
      },
    };

    //
    if (json.labels != undefined) data.labels = json.labels;
    if (json.focusFix != undefined) this.focusFix = json.focusFix;

    //set data
    data.datasets.forEach((_, idx) => {
      if (json.datas[idx] != undefined) {
        if (json.datas[idx].label != undefined) data.datasets[idx].label = json.datas[idx].label;
        if (json.datas[idx].data != undefined) data.datasets[idx].data = json.datas[idx].data;

        //defualt focus
        /**
         * focusFix !== "n"
         * focusIdx 의 색상을 고정한다.
         */
        if (json.focusIdx != undefined && this.focusFix === "y") {
          data.datasets[idx].backgroundColor = [];
          data.datasets[idx].borderColor = [];
          json.datas[idx].data.forEach((__, _idx) => {
            if (this.theme === "dark") {
              data.datasets[idx].backgroundColor.push(
                json.focusIdx == _idx ? this.bar_color_focus_dark : this.bar_color_default_dark
              );
              data.datasets[idx].borderColor.push(
                json.focusIdx == _idx ? this.bar_color_focus_dark : this.bar_color_default_dark
              );
            } else {
              data.datasets[idx].backgroundColor.push(
                json.focusIdx == _idx ? this.bar_color_focus : this.bar_color_default
              );
              data.datasets[idx].borderColor.push(
                json.focusIdx == _idx ? this.bar_color_focus : this.bar_color_default
              );
            }
          });
        }
      } else {
        delete data.datasets[idx];
      }
    });

    data.datasets.length = json.datas.length;

    //
    if (tooltipEl != null) {
      options.plugins.tooltip.external = this.externalTooltipHandler.bind(this);
      options.plugins.tooltip.enabled = false;
    }

    const _chart = new Chart(document.getElementById(canvasId), {
      type: "bar",
      data: data,
      options: options,
      plugins: [ChartDataLabels, nextDraw, this.barDraw],
    });

    //
    _chart.barDrawLoaded = false;
    _chart.self = this;

    if (tooltipEl != null) _chart.toolTipTarget = tooltipEl;
    if (json.focusIdx != undefined) _chart.focusIdx = json.focusIdx;

    if (json.focusIdx != undefined) {
      this.lastIdx = json.focusIdx;
      //this.chageX_Tick(_chart, json.focusIdx);
    }

    if (dataType) _chart.dataType = dataType;

    //data list
    if (dataTip) {
      dataList.innerHTML = "";
      data.datasets.forEach((itm, $idx) => {
        const _wrap = document.createElement("div");
        const _canvas = document.createElement("canvas");
        const _msg = document.createElement("span");

        _wrap.className = "list";
        _canvas.className = "pattern";
        _msg.className = "title";

        _canvas.width = 20;
        _canvas.height = 20;
        const ctx = _canvas.getContext("2d");
        ctx.beginPath();

        ctx.arc(10, 10, 10, 0, 2 * Math.PI);
        ctx.fillStyle = itm.borderColor;
        ctx.fill();

        // if (data.datasets[$idx].borderDash == "" || data.datasets[$idx].borderDash == "[]"){
        //   ctx.arc(10, 10, 10, 0, 2 * Math.PI);
        //   ctx.fillStyle = data.datasets[$idx].borderColor;
        //   ctx.fill();
        // }else{
        //    ctx.arc(10, 10, 7, 0, 2 * Math.PI);
        //   ctx.strokeStyle = data.datasets[$idx].borderColor;
        //   ctx.setLineDash([2,2]);
        //   ctx.lineWidth = 5;
        //   ctx.stroke();
        // }

        _msg.innerText = itm.label;

        _wrap.append(_canvas);
        _wrap.append(_msg);

        dataList.append(_wrap);
      });
    }
  }

  /*
  doughnut
  */
  async chartDoughnut(obj, json) {
    const _this = this;

    _this.theme = document.documentElement.getAttribute("data-theme");

    const centerTextPlugin = {
      id: "centerText",
      afterDraw(chart) {
        const { ctx, chartArea, options } = chart;
        if (!chartArea) return;

        //
        _this.theme = document.documentElement.getAttribute("data-theme");

        const { left, right, top, bottom } = chartArea;
        const x = (left + right) / 2;
        const y = (top + bottom) / 2;

        // ✅ centerText 옵션(차트별)
        const _optsPl = options != null ? options.plugins : void 0;
        const ct = (_optsPl != null && _optsPl.centerText) || {};

        const label = ct.label != null ? ct.label : "";
        const value = ct.value != null ? ct.value : "";
        const color = _this.theme === "dark" ? ct.colorDark : ct.color;

        // // ✅ JSON으로 폰트 커스텀 가능하게 (없으면 기본값)
        // const labelFontSize = ct.labelFontSize ?? 14;
        // const valueFontSize = ct.valueFontSize ?? 22;
        // const labelFontWeight = ct.labelFontWeight ?? 500;
        // const valueFontWeight = ct.valueFontWeight ?? 700;
        // const fontFamily = ct.fontFamily ?? "Digital One Shinhan";
        // const color = _this.theme==="dark"?ct.colorDark:ct.color;

        // // ✅ 라인 간격(옵션)
        // const lineGap = ct.lineGap ?? 10;

        // ctx.save();
        // ctx.textAlign = "center";
        // ctx.textBaseline = "middle";
        // ctx.fillStyle = color;

        // // line 1 (label)
        // if (label) {
        //   ctx.font = `${labelFontWeight} ${labelFontSize}px ${fontFamily}`;
        //   ctx.fillText(label, x, y - lineGap / 2);
        // }

        // // line 2 (value)
        // if (value) {
        //   ctx.font = `${valueFontWeight} ${valueFontSize}px ${fontFamily}`;
        //   ctx.fillText(value, x, y + lineGap / 2 + 10);
        // }

        // ctx.restore();

        const className = "doughnut-label";
        let wrap = ctx.canvas.parentElement.querySelector(`.${className}`);
        if (!wrap) {
          wrap = document.createElement("div");
          wrap.className = className;

          const _label = document.createElement("div");
          _label.className = "label";
          const _value = document.createElement("div");
          _value.className = "value";

          wrap.append(_label);
          wrap.append(_value);
          ctx.canvas.insertAdjacentElement("afterend", wrap);
        }

        const labelObj = wrap.querySelector(".label");
        const valueObj = wrap.querySelector(".value");

        labelObj.style.color = color;
        valueObj.style.color = color;
        labelObj.innerHTML = label;
        valueObj.innerHTML = value;
      },
    };

    let makePatternsUsingCount = 0;
    async function makePatterns(ctx, colors) {
      function createSvgPattern(ctx, bgColor) {       
        // const unit = 25; // 실제 패턴 반복 단위(원하는 크기)
        // const render = 220; // 이미지 렌더 해상도(클수록 선명) - 120/160/200 추천
        // const scale = unit / render; // 40/160 = 0.25
        // const svgString = `
        // <svg xmlns="http://www.w3.org/2000/svg"
        //     width="${render}" height="${render}"
        //     viewBox="0 0 ${unit} ${unit}">
        //   <rect width="${unit}" height="${unit}" fill="${bgColor}"/>
        //   <circle cx="10" cy="10" r="3" fill="#fff"/>
        // </svg>`.trim();
        //const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;

        const svgUrl = `${gfn.devServer() ? "" : "/pconts"}/static/svg/chart/${_this.pattern[makePatternsUsingCount++]}.svg`;
        const patternScale = 2;
        return new Promise((resolve) => {
          const img = new Image();
          img.decoding = "async";

          // img.onload = () => {
          //   const pattern = ctx.createPattern(img, "repeat");

          //   // if (pattern && typeof pattern.setTransform === "function") {
          //   //   pattern.setTransform(new DOMMatrix().scale(scale));
          //   // }
          //   resolve(pattern);
          // };

          img.onload = () => {
            const dpr = window.devicePixelRatio || 1;
            const imgW = img.naturalWidth || 180;
            const imgH = img.naturalHeight || 70;

            const offscreen = document.createElement("canvas");
            offscreen.width = Math.ceil(imgW * patternScale * dpr);
            offscreen.height = Math.ceil(imgH * patternScale * dpr);

            const offCtx = offscreen.getContext("2d");
            offCtx.drawImage(img, 0, 0, offscreen.width, offscreen.height);

            const pattern = ctx.createPattern(offscreen, "repeat");
            if (pattern && typeof pattern.setTransform === "function") {
              pattern.setTransform(new DOMMatrix().scale(1 / (patternScale * dpr)));
            }
            resolve(pattern);
          };

          img.src = svgUrl;
        });
      }

      // colors 배열 → 패턴 배열
      const promises = colors.map((c) => createSvgPattern(ctx, c));
      return Promise.all(promises);
    }

    async function makeDoughnut(json, idx = 0) {
      makePatternsUsingCount = 0;
      const baseColors = json.baseColors || ["red"];
      const dataTip = json.dataTip == "y" ? true : false;

      const wrap = document.createElement("div");
      wrap.className = "chart-wrap";

      const canvasId = _this.setCanvasID();
      const _canvas = document.createElement("canvas");
      _canvas.id = canvasId;

      // //flush
      // obj.innerHTML = "";
      wrap.append(_canvas);
      obj.append(wrap);

      //set toolTip
      let tooltipEl = null;
      if (idx == 0 && json.toolTipTitle != undefined && json.toolTipTitle != "") {
        tooltipEl = document.createElement("div");
        tooltipEl.className = "chart-bar-tooltip";
        tooltipEl.tooltipTitle = json.toolTipTitle || "";
        obj.append(tooltipEl);
      }

      let dataList = null;
      if (idx == 0 && dataTip) {
        dataList = document.createElement("div");
        dataList.classList.add("chart-doughnut");
        dataList.classList.add("data-list");
        //dataList.className = "data-list";
        //obj.append(dataList);
        obj.insertAdjacentElement("afterend", dataList);
      }

      const data = {
        labels: ["1월"],
        datasets: [
          {
            data: [100],
            backgroundColor: "red",
            borderWidth: 0,
            spacing: 1,
          },
        ],
      };

      const options = {
        animation: {
          duration: 0,
          onComplete: (context) => {
            const { chart } = context;
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%", // 도넛 안쪽 구멍 크기
        layout: {
          padding: {
            top: 0,
            bottom: 0,
            //bottom: dataTip ? 40 : 0,
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
          },
          centerText: {
            label: "label",
            value: "0%",
          },
        },
      };

      //replace
      // labels / data
      if (json.labels) {
        data.labels = json.labels;
      }

      if (json.datas[idx].data) {
        data.datasets[0].data = json.datas[idx].data;
      }

      // ✅ centerText 전체를 options.plugins.centerText로 연결
      options.plugins.centerText = {
        ...(options.plugins.centerText || {}), // 기존 기본값 유지
        ...(json.datas[idx].centerText || {}), // JSON에서 온 값 덮어쓰기
      };

      // data.datasets[0].backgroundColor = await makePatterns(_canvas.getContext("2d"), baseColors);

      const _chart = new Chart(_canvas, {
        type: "doughnut",
        data: data,
        options: options,
        plugins: [centerTextPlugin],
      });

      data.datasets[0].backgroundColor = await makePatterns(_chart.ctx, baseColors);
      _chart.update();

      //
      _chart.barDrawLoaded = false;
      _chart.self = this;

      if (tooltipEl != null) _chart.toolTipTarget = tooltipEl;

      //data list
      if (dataTip && idx == 0) {
        dataList.innerHTML = "";
        data.labels.forEach((itm, $idx) => {
          const _wrap = document.createElement("div");
          const _canvas = document.createElement("canvas");
          const _msg = document.createElement("span");

          _wrap.className = "list";
          _canvas.className = "pattern";
          _msg.className = "title";

          const size = 12;
          const dpr = window.devicePixelRatio || 1;

          // 레티나 대응 (뭉개짐 방지 핵심)
          _canvas.width = Math.round(size * dpr);
          _canvas.height = Math.round(size * dpr);
          _canvas.style.width = size + "px";
          _canvas.style.height = size + "px";

          const ctx = _canvas.getContext("2d");
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

          const img = new Image();
          img.src = `${gfn.devServer() ? "" : "/pconts"}/static/svg/chart/${_this.pattern[$idx]}.svg`;
          img.onload = function () {
            const _width = 150;
            ctx.drawImage(img, -9, -10, _width, img.height * (_width / img.width));
            //ctx.drawImage(img, 0, 0, size, size);
          };


          // 패턴 대신 baseColor 직접 사용
          // const bgColor = (json.baseColors && json.baseColors[$idx]) || "#4C7DFF";

          // ctx.clearRect(0, 0, size, size);
          // ctx.fillStyle = bgColor;
          // ctx.fillRect(0, 0, size, size);

          // 중앙 점 직접 그리기 (픽셀 정렬해서 선명하게)
          // ctx.fillStyle = "#fff";
          // const r = 1.8; // 점 반지름
          // const cx = Math.round(size / 2) + 0.25;
          // const cy = Math.round(size / 2) + 0.25;

          // ctx.beginPath();
          // ctx.arc(cx, cy, r, 0, Math.PI * 2);
          // ctx.fill();

          _msg.innerText = itm;

          _wrap.append(_canvas);
          _wrap.append(_msg);

          dataList.append(_wrap);
        });
      }

      //
      _chart.type = "doughnut";
    }

    //
    obj.innerHTML = "";

    json.datas.forEach(async (_, idx) => {
      await makeDoughnut(json, idx);
    });
  }

  /*
  line   
  */
  chartLine(obj, json) {
    const _this = this;

    const tension = 0;
    const borderWidth = 3;
    const pointBorderWidth = 2;
    const pointRadius = 5;
    const hitRadius = 0;
    const pointBackgroundColor = "#fff";

    const dataType = json.dataType || "";
    const guideLineType = json.guideLineType || [];
    const guideStep = json.guideStep || 0;
    const guideLine = json.guideLine == "y" ? true : false;
    const guideLabel = json.guideLabel == "y" ? true : false;
    const barTag = json.barTag == "y" ? true : false;
    const dataTip = json.dataTip == "y" ? true : false;

    //
    const canvasId = this.setCanvasID();
    const _canvas = document.createElement("canvas");
    _canvas.id = canvasId;

    _this.theme = document.documentElement.getAttribute("data-theme");

    //flush
    obj.innerHTML = "";
    obj.append(_canvas);

    //set toolTip
    let tooltipEl = null;
    if (json.toolTipTitle != undefined && json.toolTipTitle != "") {
      tooltipEl = document.createElement("div");
      tooltipEl.className = "chart-line-tooltip";
      tooltipEl.tooltipTitle = json.toolTipTitle || "";
      obj.append(tooltipEl);
    }

    //dataList
    let dataList = null;
    if (dataTip) {
      dataList = document.createElement("div");
      dataList.className = "data-list";
      obj.append(dataList);
    }

    //최대 4개로 제한 한다.
    const data = {
      labels: ["labelA", "labelB", "labelC", "labelD"],
      datasets: [
        {
          label: "tipA",
          data: [10, 20, 50, 40],
          fill: false,
          borderColor: "#E57708",

          borderDash: [],

          tension: tension,
          borderWidth: borderWidth,
          pointBorderWidth: pointBorderWidth,
          pointHoverBorderWidth: pointBorderWidth,
          pointRadius: pointRadius,
          pointHoverRadius: pointRadius,
          pointBackgroundColor: pointBackgroundColor,
          pointHoverBackgroundColor: pointBackgroundColor,
          hitRadius: hitRadius,
        },
        {
          label: "tipB",
          data: [20, 30, 40, 10],
          borderColor: "#15A46E",
          borderDash: [],

          fill: false,
          tension: tension,
          borderWidth: borderWidth,
          pointBorderWidth: pointBorderWidth,
          pointHoverBorderWidth: pointBorderWidth,
          pointRadius: pointRadius,
          pointHoverRadius: pointRadius,
          pointBackgroundColor: pointBackgroundColor,
          pointHoverBackgroundColor: pointBackgroundColor,
          hitRadius: hitRadius,
        },
        {
          label: "tipC",
          data: [40, 40, 30, 20],
          fill: false,
          borderColor: "#5290FF",

          tension: tension,
          borderWidth: borderWidth,
          pointBorderWidth: pointBorderWidth,
          pointHoverBorderWidth: pointBorderWidth,
          pointRadius: pointRadius,
          pointHoverRadius: pointRadius,
          pointBackgroundColor: pointBackgroundColor,
          pointHoverBackgroundColor: pointBackgroundColor,
          hitRadius: hitRadius,
        },
        {
          label: "tipD",
          data: [40, 50, 20, 30],
          fill: false,
          borderColor: "#818DA2",

          tension: tension,
          borderWidth: borderWidth,
          pointBorderWidth: pointBorderWidth,
          pointHoverBorderWidth: pointBorderWidth,
          pointRadius: pointRadius,
          pointHoverRadius: pointRadius,
          pointBackgroundColor: pointBackgroundColor,
          pointHoverBackgroundColor: pointBackgroundColor,
          hitRadius: hitRadius,
        },
      ],
    };

    const options = {
      animation: {
        duration: 0,
        onComplete: (context) => {
          const { chart } = context;
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 0,
          bottom: dataTip ? 30 : 0,
        },
      },
      plugins: {
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          display: false,
        },
      },

      scales: {
        x: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            display: true,
            padding: 15,
            color: function (context) {
              return _this.theme === "dark" ? _this.label_x_color_dark : _this.label_x_color;
            },

            font: {
              size: this.font_size,
              family: this.font_family,
              weight: this.font_weight,
            },
          },
          border: {
            display: guideLine ? false : true,
            color: function () {
              return _this.theme === "dark" ? _this.bar_border_color_dark : _this.bar_border_color;
            },
          },

          offset: true,
          padding: {
            left: 20,
            right: 20,
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: false,
          },
          grid: {
            display: guideLine,
            color: function () {
              return _this.theme === "dark" ? _this.bar_border_color_dark : _this.bar_border_color;
            },
          },
          ticks: {
            padding: 0,
            color: function (context) {
              _this.theme = document.documentElement.getAttribute("data-theme");
              return _this.theme === "dark" ? _this.label_y_color_dark : _this.label_y_color;
            },
            font: {
              size: this.font_size,
              family: this.font_family,
              weight: this.font_weight,
            },
            callback: function (value, index, ticks) {
              if (dataType == "%") return value + "%";
              else if (dataType == "won") return _this.replaceValWon(value);
              else if (dataType) return value.toLocaleString("ko-KR") + dataType;
              else return value;
            },
            stepSize: function () {
              if (guideStep > 0) return guideStep;
              else if (dataType == "%") return 10;
              else if (dataType == "won") return 50000000;
              else return 10;
            },
            min: 0,
            display: guideLabel,
            padding: 20,
          },
          border: {
            dash: function (context) {
              return context.index === 0 ? [] : guideLineType;
            },
            display: guideLabel,
            color: function () {
              return _this.theme === "dark" ? _this.bar_border_color_dark : _this.bar_border_color;
            },
          },
        },
      },
    };

    //
    if (json.labels != undefined) data.labels = json.labels;

    //set data
    data.datasets.forEach((_, idx) => {
      if (json.datas[idx] != undefined) {
        if (json.datas[idx].label != undefined) data.datasets[idx].label = json.datas[idx].label;
        if (json.datas[idx].data != undefined) data.datasets[idx].data = json.datas[idx].data;
        if (json.datas[idx].color != undefined) data.datasets[idx].borderColor = json.datas[idx].color;
        if (json.datas[idx].LineType != undefined) data.datasets[idx].borderDash = json.datas[idx].LineType;
        if (json.datas[idx].pointCircle == "n") data.datasets[idx].pointBorderWidth = 0;
        if (json.datas[idx].pointCircle == "n") data.datasets[idx].pointRadius = 0;
      } else {
        delete data.datasets[idx];
      }
    });

    data.datasets.length = json.datas.length;

    const _chart = new Chart(document.getElementById(canvasId), {
      type: "line",
      data: data,
      options: options,
      plugins: [ChartDataLabels],
    });

    //
    _chart.barDrawLoaded = false;
    _chart.self = this;

    //data list
    if (dataTip) {
      dataList.innerHTML = "";
      data.labels.forEach((itm, $idx) => {
        const _wrap = document.createElement("div");
        const _canvas = document.createElement("canvas");
        const _msg = document.createElement("span");

        _wrap.className = "list";
        _canvas.className = "pattern";
        _msg.className = "title";

        _canvas.width = 20;
        _canvas.height = 20;
        const ctx = _canvas.getContext("2d");
        ctx.beginPath();

        if (data.datasets[$idx].borderDash == "" || data.datasets[$idx].borderDash == "[]") {
          ctx.arc(10, 10, 10, 0, 2 * Math.PI);
          ctx.fillStyle = data.datasets[$idx].borderColor;
          ctx.fill();
        } else {
          ctx.arc(10, 10, 7, 0, 2 * Math.PI);
          ctx.strokeStyle = data.datasets[$idx].borderColor;
          ctx.setLineDash([2, 2]);
          ctx.lineWidth = 5;
          ctx.stroke();
        }

        _msg.innerText = data.datasets[$idx].label;

        _wrap.append(_canvas);
        _wrap.append(_msg);

        dataList.append(_wrap);
      });
    }
  }

  /*
  vs
  */
  async chartVS(obj, json) {
    const _this = this;

    const values = json.datas.map((d) => (d.data != null ? d.data : 0));
    const maxIndex = values.indexOf(Math.max(...values));

    _this.theme = document.documentElement.getAttribute("data-theme");

    async function makeVS(json, idx = 0) {
      //
      const wrap = document.createElement("div");
      wrap.className = "chart-wrap chart-bar";

      //
      const canvasId = _this.setCanvasID();
      const _canvas = document.createElement("canvas");
      _canvas.id = canvasId;

      //set toolTip
      let tooltipEl = null;
      if (json.toolTipTitle != undefined && json.toolTipTitle != "") {
        tooltipEl = document.createElement("div");
        tooltipEl.className = "chart-bar-tooltip";
        tooltipEl.tooltipTitle = json.toolTipTitle || "";
        wrap.append(tooltipEl);
      }

      // //flush
      // obj.innerHTML = "";
      wrap.append(_canvas);
      obj.append(wrap);

      //label
      const _label = document.createElement("div");
      _label.className = "chart-label";
      //vs
      if (json.datas.length > idx + 1) {
        const _split = document.createElement("div");
        _split.className = "chart-split";
        _split.innerText = "VS";
        obj.append(_split);
      }

      let chartColor = (json.baseColors && json.baseColors[idx]) || "#818DA2";
      // data가 더 큰 값에 is-max클래스 추가
      if (idx === maxIndex && values[maxIndex] > 0) {
        _label.classList.add("is-max");
        chartColor = json.maxColor || "#4C7DFF";
      }

      _label.innerHTML = json.datas[idx].label;
      wrap.append(_label);

      // ✅ 레이어(팝업) 안에서만 점수 표시
      const isInLayer = !!obj.closest(".myLvDetail");

      // 기본 라벨 HTML
      let labelHTML = json.datas[idx].label;

      // 레이어 팝업 안에서만 점수 텍스트를 라벨 안에 포함
      if (isInLayer) {
        const valueText = (json.datas[idx].data != null ? json.datas[idx].data : 0) + "점";
        labelHTML += `<span class="chart-value">${valueText}</span>`;
      }
      _label.innerHTML = labelHTML;
      wrap.append(_label);
      const data = {
        labels: ["labelA"],
        datasets: [
          {
            label: json.datas[idx].label,
            data: [json.datas[idx].data],
            fill: false,
            backgroundColor: chartColor,

            borderWidth: 0,
            pointBorderWidth: 0,
            barThickness: 40,

            minBarLength: 2,

            borderRadius: {
              topLeft: 4,
              topRight: 4,
              bottomLeft: 0,
              bottomRight: 0,
            },
          },
        ],
      };

      const options = {
        //indexAxis: 'y',

        animation: {
          duration: 0,
          onComplete: (context) => {
            const { chart } = context;
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: isInLayer ? 0 : 20,
            bottom: 0,
          },
        },
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
          datalabels: {
            // display: true,
            display: !isInLayer,
            anchor: "end",
            align: "top",
            offset: 0,
            color: function (context) {
              _this.theme = document.documentElement.getAttribute("data-theme");
              if (idx === maxIndex && values[maxIndex] > 0) {
                return json.maxLabelColor != null ? json.maxLabelColor : chartColor;
              }
              return json.defaultLabelColor != null ? json.defaultLabelColor : chartColor;
            },
            font: {
              size: _this.font_size,
              family: _this.font_family,
              weight: 500,
            },
          },
        },
        scales: {
          x: {
            beginAtZero: false,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
            border: {
              display: true,
              color: function () {
                return _this.theme === "dark" ? _this.bar_border_color_dark : _this.bar_border_color;
              },
            },
          },
          y: {
            beginAtZero: true,
            display: false,
            grid: {
              display: false,
            },
            min: 0,
            max: Math.max(...values),
            ticks: {
              stepSize: 20,
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
      };

      if (json.animation) {
        options.animation = json.animation;
      }

      const _chart = new Chart(_canvas, {
        type: "bar",
        data: data,
        options: options,
        plugins: [ChartDataLabels, _this.barDraw],
      });

      //
      _chart.barDrawLoaded = false;
      _chart.self = this;
    }

    //
    obj.innerHTML = "";

    json.datas.forEach(async (_, idx) => {
      await makeVS(json, idx);
    });
  }
}

const shc_chart = new showChar();

ScriptHub.onReady("core", function () {
  shc_chart.init();
});

Object.assign(window, {
  shc_chart,
});
