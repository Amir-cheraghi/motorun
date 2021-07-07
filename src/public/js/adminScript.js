function disableText(input , self){
   $(self).prop('checked')?$(`#${input}`).attr('disabled' , false):$(`#${input}`).attr('disabled' , true)
}

function createSlide(){
   const form = $('#createSlideForm')
   const data = new FormData(form[0])
   $.ajax({
      url : './../api/features/slider',
      type : 'POST',
      async : true,
      data : data ,
      processData: false,
      contentType: false,
      success : (res)=>{
         if(res.status == 'success'){
            $('#slides').append(`
            <section class="content">
                <div class="card card-default collapsed-card">
      
                  <div class="card-header p-3">
                    <h3 class="card-title "  data-widget="collapse" data-toggle="tooltip">اسلاید شماره ${$('#slides').get(0).childElementCount + 1} - ${res.data.sliderTitle || 'بدون نام'}</h3>
                    <div class="card-tools">
                      <button type="button" class="btn btn-warning ml-2" data-widget="collapse" data-toggle="tooltip">
                        ویرایش</button>
                      <button type="button" class="btn btn-danger">حذف</button>
                    </div>
                  </div>
      
                  <div class="card-body">
      
                  </div>
      
                  <div class="card-footer">
      
                  </div>
      
                </div>
              </section>
              `)
         }
      }
   })
}

<script src="js/custom.js" type="text/javascript"></script>
