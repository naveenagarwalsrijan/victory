/*global window:false*/
/*eslint-disable no-magic-numbers */
import React from "react";
import { VictoryChart } from "Packages/victory-chart/src/index";
import { VictoryStack } from "Packages/victory-stack/src/index";
import { VictoryGroup } from "Packages/victory-group/src/index";
import { VictoryBar } from "Packages/victory-bar/src/index";
import { VictoryLine } from "Packages/victory-line/src/index";
import { VictoryScatter } from "Packages/victory-scatter/src/index";
import { VictoryVoronoiContainer } from "Packages/victory-voronoi-container/src/index";
import { random, range } from "lodash";
import { Flyout, VictoryTooltip } from "Packages/victory-tooltip/src/index";
import { VictoryLegend } from "Packages/victory-legend/src/index";
import { VictoryLabel, VictoryTheme } from "Packages/victory-core/src/index";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.getData()
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData()
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData() {
    const bars = random(6, 10);
    return range(bars).map((bar) => {
      return { a: bar + 1, b: random(2, 10) };
    });
  }

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    const chartStyle = { parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } };

    const dy = 13;
    const CustomLabel = (props) => {
      const x = props.x - 2 - 4 * Math.max(...props.text.map((t) => t.length));
      const startY = 2 + props.y - (props.text.length * dy) / 2;
      return (
        <g>
          {props.activePoints.map((pt, idx) => {
            return (
              <rect
                key={`square_${idx}`}
                width={10}
                height={10}
                x={x}
                y={startY + dy * idx}
                style={{ fill: pt.c }}
              />
            );
          })}
          <VictoryLabel {...props} />
        </g>
      );
    };

    const CustomFlyout = (props) => {
      return <Flyout {...props} width={props.width + 15} />;
    };

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryChart
            style={chartStyle}
            domain={{ y: [0, 6] }}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension="x"
                labels={({ datum }) => `y: ${datum.y}`}
                labelComponent={
                  <VictoryTooltip
                    text={({ activePoints }) => {
                      return activePoints.map(({ y }) => `value: ${y}`).join(" - ");
                    }}
                  />
                }
              />
            }
          >
            <VictoryScatter
              style={{ data: { fill: "red" }, labels: { fill: "red" } }}
              size={({ active }) => active ? 10 : 5}
              data={[
                { x: 0, y: 2 },
                { x: 2, y: 3 },
                { x: 4, y: 4 },
                { x: 6, y: 5 }
              ]}
            />
            <VictoryScatter
              data={[
                { x: 2, y: 2 },
                { x: 4, y: 3 },
                { x: 6, y: 4 },
                { x: 8, y: 5 }
              ]}
            />
          </VictoryChart>
            <VictoryScatter
              containerComponent={
                <VictoryVoronoiContainer
                  voronoiDimension="x"
                  labels={({ datum }) => `y: ${datum.y}`}
                  labelComponent={
                    <VictoryTooltip
                      text={({ activePoints }) => {
                        return activePoints.map(({ y }) => `value: ${y}`).join(" - ");
                      }}
                    />
                  }
                />
              }
              style={chartStyle}
              size={({ active }) => active ? 10 : 5}
              data={[
                { x: 0, y: 2 },
                { x: 2, y: 3 },
                { x: 4, y: 4 },
                { x: 6, y: 5 }
              ]}
            />
        </div>
      </div>
    );
  }
}

export default App;
