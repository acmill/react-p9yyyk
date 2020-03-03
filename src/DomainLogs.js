import React, { Component, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { VariableSizeGrid as Grid } from "react-window";
import ResizeObserver from "rc-resize-observer";
import classNames from "classnames";
import { Table, Button } from "antd";

function VirtualTable(props) {
  const { columns, scroll, className } = props;
  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns.filter(({ width }) => !width).length;
  const mergedColumns = columns.map(column => {
    if (column.width) {
      return column;
    }

    return { ...column, width: Math.floor(tableWidth / widthColumnCount) };
  });
  const gridRef = useRef();
  const [connectObject] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, "scrollLeft", {
      get: () => null,
      set: scrollLeft => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft
          });
        }
      }
    });
    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: false
    });
  };

  useEffect(() => resetVirtualGrid, []);
  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
    ref.current = connectObject;
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={index => {
          const { width } = mergedColumns[index];
          return index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft
          });
        }}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames("virtual-table-cell", {
              "virtual-table-cell-last":
                columnIndex === mergedColumns.length - 1
            })}
            style={style}
          >
            {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        {...props}
        className={classNames(className, "virtual-table")}
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList
        }}
      />
    </ResizeObserver>
  );
} // Usage

const columns = [
  {
    title: "Line Number",
    dataIndex: "key",
    width: 150
  },
  {
    title: "B",
    dataIndex: "key"
  },
  {
    title: "C",
    dataIndex: "key"
  }
];
const data = [];
function ShowData() {
  for (let i = 0; i < 1000; i += 1) {
    setTimeout(() => {
      data.push({
        key: i
      });
    }, i * 500);
  }
}
class DomainLogs extends Component {
  render() {
    return (
      <div>
        <VirtualTable
          columns={columns}
          dataSource={data}
          scroll={{
            y: 300,
            x: "100vw"
          }}
        />
      </div>
    );
  }
}

export default DomainLogs;
