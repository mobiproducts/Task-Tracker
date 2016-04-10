/**
 * Created by Rick on 4/8/2016.
 */
$(document).ready(function(){

    //cache out - declare all variables
    var $tasks = $('#tasks');
    var $name = $('#name');
    var $date = $('#date');
    var $assigned = $('#assigned');
    $name.focus();

    listTask();

    function listTask(){
        //get date and populate to table
        $.ajax({
            type: 'GET',
            url: 'task.json',
            success: function(tasks) {
                //console.log('success', tasks);
                $.each(tasks, function (i, task) {
                    $tasks.append('<tr><td class="td-name">'+task.name+'</td>' +
                        '<td class="td-date">'+task.date+'</td>' +
                        '<td class="td-assigned">'+task.assigned+'</td>' +
                        '</tr>');
                });
            },
            error: function(){
                alert('Error Loading Task Lists.')
            }
        });
    }

    //enter key to add task
    $(document).keypress(function(e) {
        if(e.which == 13) {
            $('#add-task').click();
        }
    });

    addTask();

    function addTask(){
        //make a post when click on submit
        //get value from input textboxes and prepend to table
        $('#add-task').on('click', function(){
            //console.log('hello world.')
            if( $name.val().trim().length == 0 || $date.val().trim().length == 0 || $assigned.val().trim().length == 0)
            {
                // alert if no text enter
                alert('please enter all fields')
                $name.val("");
                $date.val("");
                $assigned.val("");
                $name.focus();
            }
            else
            {
                $('#add-task').focus();
                $tasks.prepend('<tr><td class="td-name">' + $name.val() +'</td>' +
                    '<td class="td-date">' + $date.val() +'</td>' +
                    '<td class="td-assigned">' + $assigned.val() +'</td>' +
                    '</tr>');

                $name.val("");
                $date.val("");
                $assigned.val("");
                $name.focus();

            };

        });
    }

});