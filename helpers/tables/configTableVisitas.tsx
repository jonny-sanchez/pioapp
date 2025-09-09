import ButtonForm from "components/form/ButtonForm"

const configTableVisitas = [
    {
      data: 'name',
      name: 'Tienda',
    //   search: true
    },
    {
      data: 'calories',
      name: 'Fecha',
    //   search: true
    },
    {
      data: null,
      name: 'Acciones',
      search: false,
      render: (data:any) => ( 
        <ButtonForm 
          label="detalle" 
          style={{ marginVertical: 8 }} 
          icon="eye"
        /> 
      )
    },
]

export default configTableVisitas