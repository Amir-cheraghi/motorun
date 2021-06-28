function disableText(input , self){
   $(self).prop('checked')?$(`#${input}`).attr('disabled' , false):$(`#${input}`).attr('disabled' , true)
}