// header("Access-Control-Allow-Origin: *");
function startMonitoring(tokenid) {
   let flag = false;
   $(document).ready(function () {
      $("#sdm-btn").click(function () {
         $(".sdm__control").toggleClass("active");
         flag = flag == false ? true : false;

         if (flag) {
            getStatistics(tokenid);
         }
      })
   })

   function getStatistics(uid) {
      $.ajax({
         type: "GET",
         url: 'http://127.0.0.1:8000/api/fetchDetails/',
         data: {
            uid: uid
         },
         async: true,
         crossDomain: true,
         dataType: 'json',
         success: function (data, status, xhr) {
            $(".sdm__number#currentPeople").html(data.currentPeopleCount);
            $(".sdm__number#currentVoilations").html(data.currentVoilatorsCount);
            $(".sdm__number#visitedIn24Hr").html(data.averageDayCount);
            $(".sdm__number#percentVoilation").html(data.percentVoilation);
         }
      });
   }
}