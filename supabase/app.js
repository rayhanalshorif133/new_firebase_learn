const SUPABASE_URL = 'https://qpoxuulyxbpmuetbcnrn.supabase.co'; // Your Supabase URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwb3h1dWx5eGJwbXVldGJjbnJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3OTQ5NDcsImV4cCI6MjA1MDM3MDk0N30.tpUmarSLtTbAD7nqZw61fO58sdO_fajbus4xv4Q4Gzs'; // Your Supabase Key

// Initialize Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);



// On Document Ready
$(document).ready(function() {
    fetchItems();

    // Create Item
    $('#crudForm').submit(async function(e) {
        e.preventDefault();
        const name = $('#name').val();
        const description = $('#description').val();

        const { data, error } = await supabase
            .from('items')
            .insert([
                { name, description }
            ]);

        if (error) {
            alert('Error: ' + error.message);
        } else {
            alert('Item added!');
            fetchItems(); // Refresh item list
        }

        // Reset form fields
        $('#crudForm')[0].reset();
    });

    // Fetch Items
    async function fetchItems() {
        const { data, error } = await supabase
            .from('items')
            .select('*');

        if (error) {
            alert('Error fetching items: ' + error.message);
        } else {
            $('#itemsList').empty();
            data.forEach(item => {
                $('#itemsList').append(`
                    <li id="item-${item.id}">
                        ${item.name} - ${item.description}
                        <button onclick="editItem(${item.id}, '${item.name}', '${item.description}')">Edit</button>
                        <button onclick="deleteItem(${item.id})">Delete</button>
                    </li>
                `);
            });
        }
    }

    // Edit Item
    window.editItem = function(id, name, description) {
        $('#editForm').show();
        $('#editName').val(name);
        $('#editDescription').val(description);
        $('#updateButton').off('click').on('click', function() {
            updateItem(id);
        });
    };

    // Update Item
    async function updateItem(id) {
        const name = $('#editName').val();
        const description = $('#editDescription').val();

        const { data, error } = await supabase
            .from('items')
            .update({ name, description })
            .eq('id', id);

        if (error) {
            alert('Error updating item: ' + error.message);
        } else {
            alert('Item updated!');
            fetchItems(); // Refresh item list
            $('#editForm').hide();
        }
    }

    // Delete Item
    window.deleteItem = async function(id) {
        const { data, error } = await supabase
            .from('items')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting item: ' + error.message);
        } else {
            alert('Item deleted!');
            fetchItems(); // Refresh item list
        }
    };
});
