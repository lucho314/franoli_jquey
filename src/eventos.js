import {updateProveedor,actualiazarTablaProveedores,guardarProveedor,updateProducto,guardarEntrada,guardarSalida, actualizarTablaStock, actualiazarTablaVentas, actualizarTablaProductos, guardarProducto,eliminarProveedor } from '../src/app.js'
import { Productos, Proveedores } from '../src/repository.js'

$("#consultarStok").click(() => {
    $("#card-stock").show()
    $('#Botonera').hide()
    actualizarTablaStock()
})

$("#ingresarStock").click(() => {
    $("#card-entrada").show()
    $('#Botonera').hide()
    let html = "<option value=''>Selecione Producto</option>"

    Productos.map(producto => {
        html += `<option value='${producto.id}' data-datos='${JSON.stringify(producto)}''>${producto.Producto}</option>`
    })

    $('#c-producto').html(html).select2();

})


$("#vender").click(async () => {
    $("#card-venta").show()
    $('#Botonera').hide()
    let html = "<option value=''>Selecione Producto</option>"

    Productos.filter(producto => producto.Stock > 0).map(doc => {
        html += `<option value='${doc.id}' data-datos='${JSON.stringify(doc)}''>${doc.Producto}</option>`
    })
    $('#v-producto').html(html).select2();

    actualiazarTablaVentas()

})

$('#v-producto').change(function () {

    let producto = $('#v-producto option:selected').data("datos")

    $('#v-precio').val(producto.Precio)

})

$("#ver-productos").click(function () {

    $("#card-productos").show()
    $('#Botonera').hide()
    actualizarTablaProductos()
})

$("#ver-ventas").click(function () {

    $("#card-Ventas").show()
    $('#Botonera').hide()
    actualiazarTablaVentas()
})

$("#ver-proveedores").click(function () {

    $("#card-proveedores").show()
    $('#Botonera').hide()
    actualiazarTablaProveedores()
})

$('.volver').click(() => {

    $('.forms').hide()
    $('#Botonera').show()


})

$('.canelar-edicion').click(function (e) {
    e.preventDefault()
    $("#card-producto_editar").hide()
    $("#card-productos").show()
})

$('.canelar-edicion-prov').click(function (e) {
    e.preventDefault()
    $("#card-proveedores").show()
    $("#card-proveedor").hide()
    $("#card-edit-proveedor").hide()
})


$(document).on('click', '.editar', function () {
    const id = $(this).data('id')

    const p = Productos.find(pr => pr.id == id)

    $("#e-producto").val(p.Producto)
    $("#e-stock").val(p.Stock)
    $("#e-precio").val(p.Precio)
    $("#e-id").val(p.id)
    $("#card-productos").hide()
    $("#card-producto_editar").show()
})

$(document).on('click', '.editarProv', function () {
    const id = $(this).data('id')

    const p = Proveedores.find(pr => pr.id == id)

    $("#e_razon_social").val(p.RazonSocial)
    $("#e_telefono").val(p.Telefono)
    $("#e_pagina").val(p.Pagina)
    $("#e-prov-id").val(id)
    $("#card-proveedores").hide()
    $("#card-edit-proveedor").show()
})

$(document).on('click', '.eliminarProv', function () {
    const id = $(this).data('id')

    const p = Proveedores.find(pr => pr.id == id)

    eliminarProveedor(proveedor)
})




$('#Nguardar').click(function () {
    const Producto = $('#Nproducto').val()
    const Stock = parseInt($('#Ncantidad').val())
    const Precio = parseInt($('#Nprecio').val())
    const proveedor = $("#Nproveedor").val()

    const Proveedor = (proveedor!='') ? Proveedores.find(p=>p.id===proveedor) : null


    guardarProducto({ Producto, Stock, Precio,Proveedor })
})

$('.volverProducto').click((e) => {
    e.preventDefault()
    $("#lista-productos").show()
    $("#nuevo-producto").hide()
    actualizarTablaProductos()
})


$('.volverProveedor').click((e)=>{
    e.preventDefault()

    $("#card-proveedores").show()
    $("#card-proveedor").hide()
    $("#card-edit-proveedor").hide()

})

$('#btn-salida').click(function(e){
    e.preventDefault()

    const id= $('#v-producto').val()
    const Cantidad = parseInt($('#v-cantidad').val())
    const Precio =parseInt($('#v-precio').val())
    const Fecha = $('#v-fecha').val()
    const producto=$('#v-producto option:selected').data("datos")
    const Cliente=$('#v-cliente').val()
     guardarSalida({Cantidad,Precio,Fecha,Cliente},id,producto)
    
})

$('#btn-entrada').click(function(e){
    e.preventDefault()

    const id= $('#c-producto').val()
    const Cantidad = parseInt($('#c-cantidad').val())
    const Precio =parseInt($('#c-costo').val())
    const Fecha = $('#c-fecha').val()
    const producto=$('#c-producto option:selected').data("datos")

    guardarEntrada({Cantidad,Precio,Fecha},id,producto)
    
})


$('#btn-guardar-edicion').click(function(e){

    e.preventDefault()
    const id= $("#e-id").val()

    const Producto=$("#e-producto").val()
    const Stock= parseInt($("#e-stock").val())
    const Precio=$("#e-precio").val()
    const proveedor = $("#e-proveedor").val()

    const Proveedor = (proveedor!='') ? Proveedores.find(p=>p.id===proveedor) : null

    updateProducto({Producto,Stock,Precio,Proveedor},id)

})


$("#btn-guardar-edicion-prov").click((e)=>{
    e.preventDefault()
    const id= $("#e-prov-id").val()

    const RazonSocial=$("#e_razon_social").val()
    const Telefono=$("#e_telefono").val()
    const Pagina=$("#e_pagina").val()
    updateProveedor({RazonSocial,Telefono,Pagina},id)
})


$('#btn-prov').click(function(){

    const RazonSocial=$("#razon_social").val()
    const Telefono=$("#telefono").val()
    const Pagina=$("#pagina").val()

    guardarProveedor({RazonSocial,Telefono,Pagina})


})

$('#tabla-productos tbody').on( 'click', '.det-prov', function () {
    const tr=$(this).closest("tr")

    const Prov = window.tblProductos.row( tr ).data() 

   $("razon-social-text").val(Prov.Proveedor.RazonSocial)
    $("telefono-text").attr("href",`https://wa.me/54${Prov.Proveedor.Telefono}`).text(Prov.Proveedor.Telefono)
    $("pagina-text").attr("href",`https://wa.me/54${Prov.Proveedor.Telefono}`).text(Prov.Proveedor.Telefono)
    $("#exampleModal2").modal("show")

   
} );