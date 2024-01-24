$('.name').click(() => {
    $('.last_train').slideToggle()
})


const finishBtn = $('.finish');
const maxLeft = $('.additional').width() - 154;
let offset
finishBtn.on('touchstart', (event) => {
    const positionStart = event.touches[0].clientX;
    finishBtn.on('touchmove', (event) => {
        offset = event.touches[0].clientX - positionStart;
        if (offset > 0 && offset < maxLeft) finishBtn.css({left : offset});
        if (offset > maxLeft) finishBtn.css({left : maxLeft})
    })
});
finishBtn.on('touchend', () => {
    if(offset > 100) {
        finishBtn.animate({left : maxLeft});
        //transorm form
    } else {
        finishBtn.animate({left : 0});
    }
})


