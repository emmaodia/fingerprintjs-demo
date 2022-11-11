// const arr = [
//   1667454974365, 1667454904278, 1667408164559, 1667365069148, 1667365067441,
// ];

const dateConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();

  var time = date + " " + month + " " + year + " " + hour;
  return time;
};

const timeConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp);

  var min = a.getMinutes();

  var time = min;

  return time;
};

// const compareDates = () => {
//   let dateArrIndex0 = dateConverter(arr[0]);
//   let dateArrIndex4 = dateConverter(arr[1]);
//   let timeArrIndex0 = timeConverter(arr[0]);
//   let timeArrIndex4 = timeConverter(arr[1]);

//   if (dateArrIndex0 === dateArrIndex4) {
//     const result = timeArrIndex0 - timeArrIndex4;
//     if (result <= 5) {
//       console.log("here");
//       console.log(result);
//       console.log(true);
//     }
//   } else {
//     console.log(false);
//   }
// };

const compareDates = (x, y) => {
  let dateArrIndex0 = dateConverter(x);
  let dateArrIndex4 = dateConverter(y);
  let timeArrIndex0 = timeConverter(x);
  let timeArrIndex4 = timeConverter(y);

  if (dateArrIndex0 === dateArrIndex4) {
    const result = timeArrIndex0 - timeArrIndex4;
    if (result <= 5) {
      console.log("here");
      console.log(true);
      console.log(result);
    }
  } else {
    console.log(false);
  }
};

module.exports = compareDates;

// compareDates();
