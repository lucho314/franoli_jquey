import {actualizarProveedor,getProveedores,grabarProveedor,getProducto,grabarMovimiento,actualizarProducto,getProductos,getVentas,Productos,Ventas,Proveedores,grabarProducto} from '../src/repository.js'
import '../src/eventos.js'



const getData=()=>{
    $("#exampleModal").modal('show')
    getProductos(()=>{
        actualizarTablaStock()
        actualizarTablaProductos()
    })
    getVentas(()=>{
        actualiazarTablaVentas()
       
    })
    getProveedores(()=>{
        actualiazarTablaProveedores()
        llenarListadoProveedor()
        $("#exampleModal").modal('hide')
    })
}

export const guardarProducto = (producto)=>{
    $("#Nguardar").html('<div class="loader" style="">Loading...</div>').attr('disabled',true)
    grabarProducto(producto).then(()=>{
        Command: toastr["success"]("Guardado correctamente!")
        $(".Nproducto").val("")
        $("#Nguardar").html('Guardar').attr('disabled',false)
    })

}

export const guardarSalida = async (salida,id,producto)=>{
  
    const venta = {
        Tipo: "Salida",
        ProductoId: getProducto(id),
        ...salida
    }
    const Stock = producto.Stock-parseInt(salida.Cantidad)
    
    $("#btn-salida").html('<div class="loader" style="">Loading...</div>').attr('disabled',true)
   
    await grabarMovimiento(venta)

    await  actualizarProducto(id,{Stock})

    Command: toastr["success"]("Guardado correctamente!")
    $("#btn-salida").html('Guardar').attr('disabled',false)
    $('.salida').val("")
}


export const guardarEntrada = async (entrada,id,producto) =>{

    const compra ={
        Tipo: "Entrada",
        ProductoId: getProducto(id),
        ...entrada
    }

    let Stock = producto.Stock+ parseInt(entrada.Cantidad)
    let Precio = Math.ceil(parseInt(entrada.Precio*1.5)/5)*5; 

    $("#btn-entrada").html('<div class="loader" style="">Loading...</div>').attr('disabled',true)

    await grabarMovimiento(compra) 

    await actualizarProducto(id,{Stock,Precio})

    $("#btn-entrada").html('Guardar').attr('disabled',false)
    Command: toastr["success"]("Guardado correctamente!")
    $('.entrada').val("")
  

}

export const updateProducto = async(producto,id)=>{
    $("#btn-guardar-edicion").html('<div class="loader" style="">Loading...</div>').attr('disabled',true)
    
    await actualizarProducto(id,producto)
    
    $("#btn-guardar-edicion").html('Guardar').attr('disabled',false)

    $("#card-producto_editar").hide()
    $("#card-productos").show()

    actualizarTablaProductos()
}

export const updateProveedor = async (prov,id) =>{
    $("#btn-guardar-edicion-prov").html('<div class="loader" style="">Loading...</div>').attr('disabled',true)
    
    await actualizarProveedor(id,prov)
    
    $("#btn-guardar-edicion-prov").html('Guardar').attr('disabled',false)

    $("#card-edit-proveedor").hide()
    $("#card-proveedores").show()

    actualiazarTablaProveedores()
}

export const actualizarTablaStock = ()=>{

    var tblReport = $('#t-stok').DataTable({
      dom: 'Bfrtip',
          buttons: [
              'excel', 'pdf', 'print'
          ],
        destroy: true,
        order: [0, "asc"],
        select: false,
        data: Productos.filter(producto=>producto.Stock>0),
        columns: [
        { data: "Producto" },
        { data: "Stock" },
        { data: "Precio" }
        ]
    })
  }


  export const actualiazarTablaProveedores =()=>{
    var tblReport = $('#t-proveedores').DataTable({
        dom: 'Bfrtip',
            buttons: [
                'excel', 'pdf', 'print'
            ],
          destroy: true,
          order: [0, "asc"],
          select: false,
          data: Proveedores,
          columns: [
          { data: "RazonSocial" },
          { data: function(d){
                return `<a href="https://wa.me/54${d.Telefono}" target="_blank">${d.Telefono}</a>`
          } },
          { data: function(d){
            return `<a href="${d.Pagina}" target="_blank">${d.Pagina}</a>`
      }  },
          { data: function(data){
            return `<button class="btn btn-sm btn-primary editarProv" data-id='${data.id}'"><i class="fa fa-edit"></i></button>
            <button class="btn btn-sm btn-danger eliminarProv" data-id='${data.id}'"><i class="fa fa-trash"></i></button>
            `
        } }
          ]
      })

  }


export  const actualizarTablaProductos=()=>{

    window.tblProductos = $('#tabla-productos').DataTable({
        destroy: true,
        order: [0, "asc"],
        select: false,
        data: Productos,
        columns: [
        { data: "Producto" },
        { data: "Stock" },
        { data: "Precio" },
        { data: function(d){
            if(d.Proveedor)
                return `<a href="#" class='det-prov' data-id='${d.id}'>${d.Proveedor.RazonSocial}</a>`
            return ''
    
        } },
        { data: function(data){
            return `<button class="btn btn-sm btn-primary editar" data-id='${data.id}'"><i class="fa fa-edit"></i></button>`
        } }
        ]
    })
  
  }

  export const guardarProveedor=async (proveedor)=>{

    $("#btn-prov").html('<div class="loader" style="">Loading...</div>').attr('disabled',true)
    
    await grabarProveedor(proveedor) 

    $("#btn-prov").html('Guardar').attr('disabled',false)
  }


export const actualiazarTablaVentas=()=>{
    var tblReport = $('#tablaUltVentas').DataTable({
        destroy: true,
        order: [0, "asc"],
        select: false,
        data: Ventas,
        columns: [
        { data: "Producto.Producto" },
        { data: "Cantidad" },
        { data: "Cliente" },
        { data: "Total" },
        { data: function(d){
          return moment(d.Fecha).format('D-MM-yyyy')
        } },
       
        ]
    })
    
  
  
  
  }

  const llenarListadoProveedor =()=>{
    let html = `<option value="">Seleccione Proveedor</option>`
    
    Proveedores.forEach(element => {
        html+=`<option value='${element.id}'>${element.RazonSocial}</option>`
    });

    $('#e-proveedor').html(html)
    $('#Nproveedor').html(html)
  }


  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}


window.onload = getData()