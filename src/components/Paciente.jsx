import React from 'react'
import { Text, View, StyleSheet , Pressable} from 'react-native'
import { formatFecha } from './Helpers/Index.jsx';
const Paciente = ({item, setModalVisible, pacienteEditar, pacienteEliminar, setModalPaciente, setPacienteSingular}) => {

    const {paciente, fecha, id} = item;

  return (
    <Pressable
        onPress={() => {
            setModalPaciente(true)
            setPacienteSingular(item)
        }}
    >
        <View style={styles.contenedor}>
            <Text style={styles.label}>Paciente</Text>
            <Text style={styles.texto}>{paciente}</Text>
            <Text style={styles.fecha}>{formatFecha(fecha)}</Text>
            
            <View style={styles.contenedorBotones}>
                <Pressable 
                    style={[styles.btn, styles.btnEditar]}
                    onPress= { () => {
                        setModalVisible(true)
                        pacienteEditar(id)
                    }}    
                >
                    <Text style={styles.btnTexto}>Editar</Text>
                </Pressable>

                <Pressable  
                    style={[styles.btn, styles.btnEliminar]}
                    onPress={() => {
                        pacienteEliminar(id);
                    }}
                >
                    <Text style={styles.btnTexto}>Eliminar</Text>
                </Pressable>
            </View>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderBottomColor: '#94a3B8',
        borderBottomWidth: 1,
        borderRadius:10,
        marginBottom:4
    },
    label: {
        color: '#374151',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: 10,
        marginLeft:10
    },
    texto: {
        color: '#6D28D9',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: 10,
        marginLeft:10
    },
    fecha: {
        color: '#374151',
        marginLeft:10
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    btn: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 20
    },
    btnEditar: {
        backgroundColor: '#F59E0B'
    },
    btnEliminar: {
        backgroundColor: '#EF4444'
    },
    btnTexto: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 12,
        color: '#FFF'
    }
});

export default Paciente