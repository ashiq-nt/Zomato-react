import React from "react";

export default function FilterPagination({ getFilterResult, pageCount }) {
  return (
    <>
      <div className="edu-pagination-section">
        {Array(pageCount)
          .fill(1)
          .map((v, i) => {
            return (
               
              <button
                className="btn btn-clr  ms-2"
                onClick={(event) => getFilterResult(event, "page")}
                value={i + 1}
                key={i}
              >
                {i + 1}
              </button>
        
            );
          })}
      </div>
    </>
  );
}
