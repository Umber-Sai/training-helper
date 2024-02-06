

// $('.add_exercise').click(() => {
//     $('.container#exercises').append($('template#1').html());
    
// })

// class RowSet {
//     constructor(element) {
//         this.element = element;
//         this.button = element.find('.add');
//         this.button.click(() => {
//             const weight = this.element.find('.weight input').val();
//             const reps = this.element.find('.repeats input').val();
//             if(true) {
//                 const doneSet = $('template#2').html();
//                 this.element.parent().prepend(doneSet);
//                 console.log(this.element.parent())
//             }
//         })
//     }
//     show() {
//         this.button.click(() => {
//             console.log(this.element.find('.weight input').val())
//             console.log(this.element.find('.repeats input').val())
//         })
//     }
  

// }


// let observer = new MutationObserver(mutation => {
//     const element = mutation[0].addedNodes[1];
//     let rowset = new RowSet($(element).find('.new_set'));

// });
// observer.observe($('.container#exercises')[0], {childList: true});


