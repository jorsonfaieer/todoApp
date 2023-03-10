const inputNuevaTarea = document.querySelector('#inputNuevaTarea');
const btnAgregarTarea = document.querySelector('#btnAgregarTarea');
const ulTareas = document.querySelector('#ulTareas');
const listaTareas = [];

function mostrarLista (){
    
    // Mostrar lista de tareas
    if(listaTareas.length > 0){
        ulTareas.innerHTML = '';
        listaTareas.forEach(element => {
            ulTareas.innerHTML += `
            <li class="flex justify-between items-center gap-4 mb-2 text-lg">
                <span class="px-2 py-1 font-semibold" id='spanTag'>${element}</span>
                <div>
                    <button class="p-2 bg-green-800 text-[#fefefe] hover:bg-green-700" id="btnFinalizar">Finalizar</button>
                    <button class="p-2 bg-red-800 text-[#fefefe] hover:bg-red-700" id="btnEliminar">Eliminar</button>
                </div>
            </li>
            `;
        });    
    }

    // Tachar tarea seleccionada
    const btnFinalizar = document.querySelectorAll('#btnFinalizar');
    if(btnFinalizar.length > 0){
        btnFinalizar.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const tarea = e.target.parentElement.parentElement.querySelector('#spanTag');
                tarea.classList.add('line-through', 'text-gray-500');
                tarea.classList.remove('font-semibold');
            });
        });
    }

    // Eliminar tarea seleccionada
    const btnEliminar = document.querySelectorAll('#btnEliminar');
    if(btnEliminar.length > 0){
        btnEliminar.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const tarea = e.target.parentElement.parentElement.querySelector('#spanTag');
                tarea.parentElement.remove();
                listaTareas.splice(listaTareas.indexOf(tarea.textContent), 1);
                validarTareasVacias ();
            });            
        });
    }
}

function validarTareasVacias (){
    if(listaTareas.length == 0){
        ulTareas.innerHTML += `
        <li class="flex items-center justify-center gap-4 mb-2 text-lg">
            <span class="px-2 py-1 text-gray-500">No hay tareas pendientes!</span>
        </li>
        `;
    }
}

btnAgregarTarea.addEventListener('click', ()=>{

    // Se agrega la tarea ingreseada en el input a la listaTareas
    if(inputNuevaTarea.value != ''){
        let tarea = inputNuevaTarea.value.trim();
        tarea = tarea.charAt(0).toUpperCase() + tarea.slice(1);
        listaTareas.push(tarea);
        inputNuevaTarea.value = '';
        inputNuevaTarea.classList.remove('border-red-500');
        mostrarLista ();
    } else {
        alert('No puede ingresar una tarea vacia.');
        inputNuevaTarea.classList.add('border-red-500');
    }
});

mostrarLista ();