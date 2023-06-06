import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./App.css";

function App() {
  const [state, setState] = useState({
    options: {
      colors: ["#E91E63", "#FF9800"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "People Born",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "People Died",
        data: [3, 60, 35, 80, 49, 70, 20, 81],
      },
    ],
  });

  const [form, setForm] = useState({
    category: "",
    born: "",
    died: "",
  });

  const [editIndex, setEditIndex] = useState(-1);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== -1) {
      // Update existing data
      const updatedOptions = { ...state.options };
      updatedOptions.xaxis.categories[editIndex] = Number(form.category);

      const updatedSeries = [...state.series];
      updatedSeries[0].data[editIndex] = Number(form.born);
      updatedSeries[1].data[editIndex] = Number(form.died);

      setState({
        options: updatedOptions,
        series: updatedSeries,
      });

      setEditIndex(-1);
    } else {
      // Add new data
      setState((prevState) => {
        const { category, born, died } = form;
        const updatedOptions = {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: [...prevState.options.xaxis.categories, Number(category)],
          },
        };
        const updatedSeries = [
          {
            ...prevState.series[0],
            data: [...prevState.series[0].data, Number(born)],
          },
          {
            ...prevState.series[1],
            data: [...prevState.series[1].data, Number(died)],
          },
        ];

        return {
          options: updatedOptions,
          series: updatedSeries,
        };
      });
    }

    setForm({
      category: "",
      born: "",
      died: "",
    });
  };

  const deleteData = (index) => {
    setState((prevState) => {
      const updatedOptions = { ...prevState.options };
      updatedOptions.xaxis.categories.splice(index, 1);

      const updatedSeries = [...prevState.series];
      updatedSeries[0].data.splice(index, 1);
      updatedSeries[1].data.splice(index, 1);

      return {
        options: updatedOptions,
        series: updatedSeries,
      };
    });
  };

  const editData = (index) => {
    setForm({
      category: state.options.xaxis.categories[index].toString(),
      born: state.series[0].data[index].toString(),
      died: state.series[1].data[index].toString(),
    });
    setEditIndex(index);
  };

  const updateData = () => {
    const updatedOptions = { ...state.options };
    updatedOptions.xaxis.categories = [...state.options.xaxis.categories];
    updatedOptions.xaxis.categories[editIndex] = Number(form.category);

    const updatedSeries = [...state.series];
    updatedSeries[0].data = [...state.series[0].data];
    updatedSeries[1].data = [...state.series[1].data];
    updatedSeries[0].data[editIndex] = Number(form.born);
    updatedSeries[1].data[editIndex] = Number(form.died);

    setState({
      options: updatedOptions,
      series: updatedSeries,
    });

    setForm({
      category: "",
      born: "",
      died: "",
    });
    setEditIndex(-1);
  };

  const startYear = 1991;
  const endYear = 2050;

  const yearOptions = [];

  for (let year = startYear; year <= endYear; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  return (
    <div className="App">
      <h1>
        React Charts Demo <i className="fas fa-user"></i>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={onChange}
            required
          >
            <option value="" disabled>
              Select Year
            </option>
            {yearOptions}
          </select>

          <label htmlFor="born">Born</label>
          <input
            type="number"
            id="born"
            name="born"
            value={form.born}
            onChange={onChange}
            required
          />

          <label htmlFor="died">Died</label>
          <input
            type="number"
            id="died"
            name="died"
            value={form.died}
            onChange={onChange}
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            onClick={()=> editIndex !== -1 ? updateData : undefined}
          >
            {editIndex !== -1 ? "Update" : "Submit"}
          </button>
        </div>
      </form>
      <div className="row">
        <div className="col-4">
          <Chart options={state.options} series={state.series} type="bar" width="450" />
        </div>
        <div className="col-8">
          <h3>Data List</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Born</th>
                <th>Died</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {state.options.xaxis.categories.map((category, index) => (
                <tr key={index}>
                  <td>{category}</td>
                  <td>{state.series[0].data[index]}</td>
                  <td>{state.series[1].data[index]}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => editData(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger ml-2"
                      onClick={() => deleteData(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
