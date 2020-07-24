import React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//import "react-datepicker/dist/react-datepicker.css";


// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Customize extends React.Component {
    state = {
        startDate: new Date()
    };
    


    handleChange = date => {
        this.setState({ date })
//console.log(this.state.date);
        
}
    

    render() {
        
        return (
            <div>
            <Calendar
                onChange={this.handleChange}
                value={this.state.date}
            />
            
            </div>
        );
    }
}
export default Customize;