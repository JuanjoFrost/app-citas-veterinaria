import React, {useState, useEffect} from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text, 
    TextInput, 
    View,   
    Alert } from "react-native";
import DatePicker from "react-native-date-picker";

const Formulario = (props) => {
    const [paciente, setPaciente] = useState('');
    const [id, setId] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [sintomas, setSintomas] = useState('');


    useEffect(() => {
        if (Object.keys(props.pacienteSingular).length > 0) {
            setId(props.pacienteSingular.id);
            setPaciente(props.pacienteSingular.paciente);
            setPropietario(props.pacienteSingular.propietario);
            setEmail(props.pacienteSingular.email);
            setTelefono(props.pacienteSingular.telefono);
            setFecha(props.pacienteSingular.fecha);
            setSintomas(props.pacienteSingular.sintomas);
        }
    },[props.pacienteSingular])


    const handleCita = () => {
        //Validar
        if([paciente, propietario, email, fecha, sintomas].includes('')) {
      
            Alert.alert(
                'Error',
                'todos los campos son obligatorios',
                [{text: 'Cancelar', style:'cancel'}, {text: 'Ok'}]
            );
            //esto es parecido a un break, se acaba en return
            return 
        }
        const nuevoPaciente = {
            paciente,
            propietario,
            email,
            telefono,
            fecha,
            sintomas
        }

        //Revisar si es un registro nuevo o edición
        if (id) {
            //editando    
            nuevoPaciente.id = id;

            const pacientesActualizados = props.paciente.map(pacienteState => 
            pacienteState.id  === nuevoPaciente.id ? nuevoPaciente : pacienteState);
            
            console.log(pacientesActualizados);
        
            props.setPaciente(pacientesActualizados);
          
        }else{
            //nuevo paciente
            nuevoPaciente.id = Date.now();
            props.setPaciente([...props.paciente, nuevoPaciente]);
        }
        setId('');
        setPaciente('');
        setPropietario('');
        setEmail('');
        setTelefono('');
        setFecha(new Date());
        setSintomas('');
        //105. Actualizando registros
        props.cerrarModal();
    
    }   

    return (
        <Modal
        animationType='slide'
        visible={props.modalVisible}
        >
            <ScrollView style={styles.contenido}>
                <Text style={styles.titulo}>{props.pacienteSingular.id ? 'Editar' : 'Nueva'} <Text style={styles.tituloBold}>Cita</Text></Text>
                
                <Pressable 
                    style={styles.btnCancelar}
                    onLongPress={()=>{
                        props.cerrarModal()
                        setId('');
                        setPaciente('');
                        setPropietario('');
                        setEmail('');
                        setTelefono('');
                        setFecha(new Date());
                        setSintomas('');
                        props.setPacienteSingular({});
                    }}
                    >
                    <Text style={styles.btnCancelarText}>X Cancelar</Text>
                </Pressable>
                <View  style={styles.campo}>
                    <Text style= {styles.label}>Nombre Paciente</Text>
                    <TextInput 
                        placeholder='Nombre Paciente' 
                        placeholderTextColor={'#666'}
                        style= { styles.input }
                        value={paciente}
                        onChangeText={setPaciente}
                    />
                </View>

                <View  style={styles.campo}>
                    <Text style= {styles.label}>Nombre propietario</Text>
                    <TextInput 
                        placeholder='Nombre Propietario' 
                        placeholderTextColor={'#666'}
                        style= { styles.input }
                        value={propietario}
                        onChangeText={setPropietario}
                    />
                </View>

                <View  style={styles.campo}>
                    <Text style= {styles.label}>E-mail</Text>
                    <TextInput 
                        placeholder='E-mail' 
                        placeholderTextColor={'#666'}
                        style= { styles.input }
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View  style={styles.campo}>
                    <Text style= {styles.label}>Teléfono propietario</Text>
                    <TextInput 
                        placeholder='Teléfono propietario' 
                        placeholderTextColor={'#666'}
                        style= { styles.input }
                        keyboardType='phone-pad'
                        value={telefono}
                        onChangeText={setTelefono}
                        maxLength={12}
                    />
                </View>

                <View  style={styles.campo}>
                    <Text style= {styles.label}>Fecha Alta</Text>
                    <View style={styles.fechaContenedor}>
                        <DatePicker
                            date={fecha}
                            locale={'es'}
                            onDateChange={(date)=>{
                                setFecha(date);
                            }}
                        >
                        </DatePicker>
                    </View>
                    
                </View>

                <View  style={styles.campo}>
                    <Text style= {styles.label}>Sintomas</Text>
                    <TextInput 
                        placeholder='Sintomas pacientes' 
                        placeholderTextColor={'#666'}
                        style= { styles.input }
                        value={sintomas}
                        onChangeText={setSintomas}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                <Pressable
                    style={styles.btnNuevaCita}
                    onPress={handleCita}
                >
                    <Text style={styles.btnNuevaCitaTexto}>{props.pacienteSingular.id ? 'Editar' : 'Agregar'} Cita</Text>
                </Pressable>
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#6D28D9',
        flex: 1
    },
    titulo: {
        fontSize: 25,
        fontWeight: '600',
        textAlign: 'center',
        marginTop:25,
        color: '#FFF'
    },
    tituloBold: {
        fontWeight:'900'
    },
    btnCancelar:{
        marginTop: 20,
        marginHorizontal: 30,
        backgroundColor: '#5827A4',
        marginVertical: 30,
        padding: 20,
        borderRadius: 10
    },
    btnCancelarText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: '700'
    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30,
        marginBottom:  10
    },
    label: {
        color:'#FFF',
        marginBottom:10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 10,

    },
    fechaContenedor: {
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    btnNuevaCita: {
        marginVertical: 50,
        backgroundColor: '#F59E0B',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnNuevaCitaTexto: {
        color: '#5827A4',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    }
});

export default Formulario;