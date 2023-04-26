import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { formatFecha } from './Helpers/Index'

const InformacionPaciente = ({pacienteSingular, setModalPaciente, setPacienteSingular}) => {
  return (
    <View style={styles.contenedor}>
        <Text style={styles.titulo}>Informacion {' '}
            <Text style={styles.tituloBold}>Paciente</Text>
        </Text>
        <View>
            <Pressable
                style= {styles.btnCerrar}
                onPress={() => {
                    setModalPaciente(false)
                    setPacienteSingular({})
                }}
            >
                <Text style={styles.btnCerrarTexto}>Cerrar</Text>
            </Pressable>
        </View>
        
        <View style= {styles.contenido}>
            <View style={styles.campo}>
                <Text style= {styles.label}>Nombre:</Text>
                <Text style={styles.valor}>{pacienteSingular.paciente}</Text>
            </View>
            <View style={styles.campo}>
                <Text style= {styles.label}>Propietario:</Text>
                <Text style={styles.valor}>{pacienteSingular.propietario}</Text>
            </View>
            <View style={styles.campo}>
                <Text style= {styles.label}>Email:</Text>
                <Text style={styles.valor}>{pacienteSingular.email}</Text>
            </View>
            <View style={styles.campo}>
                <Text style= {styles.label}>Teléfono:</Text>
                <Text style={styles.valor}>{pacienteSingular.telefono}</Text>
            </View>
            <View style={styles.campo}>
                <Text style= {styles.label}>Fecha:</Text>
                <Text style={styles.valor}>{formatFecha(pacienteSingular.fecha)}</Text>
            </View>
            <View style={styles.campo}>
                <Text style= {styles.label}>Sintomas:</Text>
                <Text style={styles.valor}>{pacienteSingular.sintomas}</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#F59E8B',
        flex: 1
    },
    titulo: {
        textAlign: 'center',
        fontSize: 20,
        color:'#374151',
        fontWeight:'600'
    },
    tituloBold: {
        fontWeight: '900',
        color: '#6D28D9'
    },
    btnCerrar:{
        marginTop: 20,
        marginHorizontal: 30,
        backgroundColor: '#5827A4',
        marginVertical: 30,
        padding: 20,
        borderRadius: 10
    },
    btnCerrarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: '700'
    },
    contenido:{
        backgroundColor: '#FFFFFF',
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 123,
            height: 213,
        },
        shadowOpacity: 0.23,
        shadowRadius: 1.62,
        elevation: 2
    },
    campo: {
        marginBottom: 10,
    },
    label: {
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: 12
    },
    valor: {
        fontWeight: '600',
        fontSize: 18,
        color: '#334155'
    }
});

export default InformacionPaciente;
