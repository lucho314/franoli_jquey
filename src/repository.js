import {db} from '../src/base.js'

export let Productos= []
export let Ventas = []
export let Proveedores=[]

export const getProductos = (fn)=>{

    db.collection("Productos").onSnapshot((snapshot) => {
         Productos= []
        snapshot.docs.forEach((doc) => {
          Productos.push({
               id: doc.id, 
               ...doc.data()
           })
          
          
       })
       fn()
    })

}

export const getVentas = (fn)=>{
     Ventas = []
    db.collection('Eventos')
      .orderBy('Fecha', 'desc')
      .where('Tipo','==',"Salida")
      .limit(100).get()
      .then(res => {
        res.forEach(doc => {
          
          Ventas.push({
                id: doc.id, 
                Producto: Productos.find(item=>item.id==doc.data().ProductoId.id),
                ...doc.data()
            })
            
        })

        fn()
     })
}



export const getProveedores = (fn)=>{
    db.collection("Proveedores").onSnapshot((snapshot) => {
      Proveedores= []
    snapshot.docs.forEach((doc) => {
      Proveedores.push({
            id: doc.id, 
            ...doc.data()
        })
      console.log(Proveedores)
      
    })
    fn()
  })
}



export const grabarMovimiento =(mov)=>{
  return  db.collection("Eventos").add(mov)
}

export const actualizarProducto=(id,datos)=>{
  return db.collection("Productos").doc(id).update(datos)
}

export const actualizarProveedor=(id,datos)=>{
  return db.collection("Proveedores").doc(id).update(datos)
}

export const grabarProducto =(prd)=>{
  return  db.collection("Productos").add(prd)
}

export const getProducto=(producto)=>{
  return db.collection("Productos").doc(producto)
}

export const grabarProveedor =(proveedor)=>{
  return  db.collection("Proveedores").add(proveedor)
}