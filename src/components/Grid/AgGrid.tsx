import React, { Component } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


export const VAgGrid = (props: AgGridReactProps) => {
  return (
    <div
      className="ag-theme-balham"
      style={{
        height: '200px',
        width: '600px'
      }}
    >
      <AgGridReact reactNext={true} {...props} />
    </div>
  );
};