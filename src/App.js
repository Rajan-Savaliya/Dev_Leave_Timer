import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function App() {
  const [value, setValue] = React.useState(null);
  const [renderResultTime, setRenderResultTime] = React.useState(null);

  const workingHoursToTime = (h, m) => {

    let getSecondWorkingTime = (h, m) => {
      var hms = `${h}:${m}`;   // your input string
      var a = hms.split(':'); // split it at the colons

      // minutes are worth 60 seconds. Hours are worth 60 minutes.
      var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60;
      return seconds;
    }

    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }



    let difftime = getSecondWorkingTime(8, 45) - getSecondWorkingTime(h, m);;

    var t = new Date();
    t.setSeconds(t.getSeconds() + difftime);




    let timeLeftSec = Math.floor((t - new Date) / 1000 / 60) * 60;
    var sec_num = parseInt(timeLeftSec, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    var ww = new Date();
    ww.setSeconds(t.getSeconds() + timeLeftSec);
    let dateFormate = formatAMPM(ww);
    setRenderResultTime(dateFormate);
  }



  return (
    <>
      <div style={{
        marginTop: 100,
        left: "50%",
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        textAlign: "center",
        maxHeight: "100vh"


      }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Basic example"
            value={value}
            onChange={(newValue) => {
              console.log(newValue.$H, newValue.$m);
              workingHoursToTime(newValue?.$H ? newValue?.$H : 0, newValue.$m ? newValue.$m : 0);
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div style={{
        marginTop: 100,
        left: "50%",
        justifyContent: "center",
        textAlign: "center",
        maxHeight: "100vh",


      }}>
        <div style={{ marginBottom: 20 }}>
          <h1>Time to Leave : King</h1>
        </div>

        <h1>{renderResultTime}</h1>
      </div>
    </>
  );
}

export default App;
