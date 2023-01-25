function FilterOption(props) {
  let { locationList, getFilterResult } = props;

  return (
    <>
      <div className="col-lg-3 col-12 shadow p-2 px-4">
        <p className="fw-bold mb-2 d-flex justify-content-between">
          Filters
          <button
            className="btn btn-sm d-lg-none"
            data-bs-toggle="collapse"
            data-bs-target="#filter-target"
            aria-expanded="true"
            aria-controls="filter-target"
          >
            <i className="fa fa-arrow-down text-primary" aria-hidden="true"></i>
          </button>
        </p>
        <aside className="d-lg-block d-md-block collapse" id="filter-target">
          <div className="mb-3">
            <label className="form-label">Select Location</label>
            <select className="form-select text-muted"
            onChange={(event) => getFilterResult(event, "location")}>
              <option value="">Select Location</option>
              {locationList.map((location, index) => {
                return (
                  <option key={index} value={location.location_id}>
                    {location.name},{location.city}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="" className="form-label fw-bold">
              Cuisine
            </label>
            <div className="form-check ms-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="north-indian"
                value="1"
                onChange={(event) => getFilterResult(event, "cuisine")}
              />
              <label htmlFor="north-indian" className="form-check-label">
                North Indian
              </label>
            </div>

            <div className="form-check ms-2">
              <input
                type="checkbox"
                className="form-check-input"
                value="2"
                onChange={(event) => getFilterResult(event, "cuisine")}
              />
              <label htmlFor="" className="form-check-label">
                South Indian
              </label>
            </div>

            <div className="form-check ms-2">
              <input
                type="checkbox"
                className="form-check-input"
                value="3"
                onChange={(event) => getFilterResult(event, "cuisine")}
              />
              <label htmlFor="" className="form-check-label">
                Chinese
              </label>
            </div>

            <div className="form-check ms-2">
              <input
                type="checkbox"
                className="form-check-input"
                value="4"
                onChange={(event) => getFilterResult(event, "cuisine")}
              />
              <label htmlFor="" className="form-check-label">
                Fast Food
              </label>
            </div>

            <div className="form-check ms-2">
              <input
                type="checkbox"
                className="form-check-input"
                value="5"
                onChange={(event) => getFilterResult(event, "cuisine")}
              />
              <label htmlFor="" className="form-check-label">
                Street Food
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="" className="form-label fw-bold">
              Cost For Two
            </label>
            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="cost-for-two"
                value="0-500"
                onChange={(event) => {
                  getFilterResult(event, "costForTwo");
                }}
              />
              <label htmlFor="" className="form-check-label">
                Less than `500
              </label>
            </div>

            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="cost-for-two"
                value="500-1000"
                onChange={(event) => {
                  getFilterResult(event, "costForTwo");
                }}
              />
              <label htmlFor="" className="form-check-label">
                500 to 1000
              </label>
            </div>

            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="cost-for-two"
                value="1000-1500"
                onChange={(event) => {
                  getFilterResult(event, "costForTwo");
                }}
              />
              <label htmlFor="" className="form-check-label">
                1000 to 1500
              </label>
            </div>

            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="cost-for-two"
                value="1500-2000"
                onChange={(event) => {
                  getFilterResult(event, "costForTwo");
                }}
              />
              <label htmlFor="" className="form-check-label">
                1500 to 2000
              </label>
            </div>

            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="cost-for-two"
                value="2000-9999999"
                onChange={(event) => {
                  getFilterResult(event, "costForTwo");
                }}
              />
              <label htmlFor="" className="form-check-label">
                2000+
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="" className="form-label fw-bold fs-5">
              Sort
            </label>
            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="sort"
                value="1"
                onChange={(event) => {
                  getFilterResult(event, "sort");
                }}
              />
              <label htmlFor="" className="form-check-label">
                Price low to high
              </label>
            </div>

            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="sort"
                value="-1"
                onChange={(event) => {
                  getFilterResult(event, "sort");
                }}
              />
              <label htmlFor="" className="form-check-label">
                Price high to low
              </label>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default FilterOption;
