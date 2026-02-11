import api from './Client.js'

export const getCart = () =>{
    const token = localStorage.getItem('token')
    return api.get('/api/cart',{
       headers : {
          Authorization : `Bearer ${token}`
       }
    })
}


export const addCart = (data) =>{
    const token = localStorage.getItem('token')
    return api.post('/api/cart',data,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    })
}


export const UpdateCart = (data) =>{
    const token = localStorage.getItem('token')
    return api.put('/api/cart',data,{
        headers :{
          Authorization : `Bearer ${token}`
        }
    })
}


export const DeleteCart = (id) =>{
    const token = localStorage.getItem('token')
    return api.delete(`/api/cart/${id}/cancel`,{
        headers : {
            Authorization : `Bearer ${token}`
        },
        data : {productId : id}
    })
}