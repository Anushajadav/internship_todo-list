

import React, { Component } from "react";


class TravelList extends Component {

    render() {
        return (
            <div className="opl">
                <h3>Create your Travel List</h3>

                <label>
                    <div className="kool">
                        <input type="checkbox" id="Ptv" />
                  Place to Visit
                </div>
                </label>
                <label >
                    <div className="kool">
                        <input type="checkbox" id="Duration" />
                 Duration 
                 </div>
                </label>
                <label >
                    <div className="kool">
                        <input type="checkbox" id="travel" />
                travel
                 </div>
                </label>
                <label >
                    <div className="kool">
                        <input type="checkbox" id="datet" />
                  Date
                 </div>
                </label>
                <button className="kee">Add</button>

                <button className="keep" >Edit</button>
                <button className="keepl">Remove</button>
            </div>
        );
    }
}
export default TravelList;