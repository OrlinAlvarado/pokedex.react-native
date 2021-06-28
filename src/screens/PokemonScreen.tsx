import React from 'react'

import { StackScreenProps } from '@react-navigation/stack'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'

import { FadeInImage } from '../components/FadeInImage'
import { RootStackParams } from '../navigator/Tab1'
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{};

export const PokemonScreen = ({ navigation, route }: Props) => {
    const { color, simplePokemon } = route.params;
    const { id, name, picture } = simplePokemon;
    const { top } = useSafeAreaInsets();
    const { pokemon, isLoading } = usePokemon(id);
    return (
        <View style={{ flex: 1 }}>
            
            {/* Header Container */}
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color,
            }}>
                {/* Back Button */}
                <TouchableOpacity
                    activeOpacity={ 0.8 }
                    onPress={() => navigation.pop() }
                    style={{
                        ...styles.backButton,
                        top: top + 5
                    }}
                >
                    <Icon 
                        name="arrow-back-outline" 
                        color="white"
                        size={30}
                    />
                </TouchableOpacity>
                {/* Nombre del pokemon */}
                <Text style={{
                    ...styles.pokemonName,
                    top: top + 45
                }}>
                    { name + '\n'}#{ id }
                </Text>
                
                {/* Pokebola blanca */}
                
                <Image 
                    source={ require('../assets/pokebola-blanca.png')}
                    style={ styles.pokeball }
                /> 
                
                
                <FadeInImage 
                    uri={ picture } 
                    style={ styles.pokemonImage }
                /> 
            
            </View>
            
            {/* Dtalles y  loading */}
            { 
                isLoading ? 
                (
                    <View style={ styles.loadingIndicator }>
                        <ActivityIndicator 
                            color={ color }
                            size={ 50 }
                        />
                    </View>
                )
                : <PokemonDetails pokemon={ pokemon } />
                
            }
            
        </View>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000
    },
    backButton: {
       position: 'absolute' ,
       left: 20,
       
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7 
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});