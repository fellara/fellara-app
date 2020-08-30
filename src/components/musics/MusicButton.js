import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { TouchableOpacity, StyleSheet, View, Linking } from 'react-native'
import { Avatar, Button, Layout, Popover, Icon, Spinner } from '@ui-kitten/components';
import {connect} from 'react-redux'
import { Audio } from 'expo-av';

import Text, {Heading, Subheading, Muted} from '../typography'
import {getMusicByTag} from '../../api/musics'
import {getFileUrl} from '../../utils'

const SButton = styled(TouchableOpacity)`
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 100px;
    bottom: 5px;
    right: 10px;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 5px #999;
`
const Wrapper = styled(View)`
    background-color: #eee;
    border-radius: 15px;
    flex: 1;
    width: 100%;
    align-items: center;
    padding: 15px;
    margin-top: 20px;
    justify-content: center;
`

const PlayCircle = styled(TouchableOpacity)`
    background-color: #fff;
    border-radius: 100px;
    width: 80px;
    height: 80px;
    align-items: center;
    justify-content: center;
`

const PlayDetails = ({music, loading, soundObject}) => {
    const [playing, setPlaying] = useState(false)

    const handlePlay = async () => {
        await soundObject.unloadAsync();

        try {
          await soundObject.loadAsync({uri: getFileUrl(music.music_file)})
          await soundObject.playAsync();
          setPlaying(true)
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <Wrapper>
            <PlayCircle
                onPress={handlePlay}
            >
                {!loading 
                    ? <Icon name='arrow-right' style={{zIndex: 9999, width: 50, height: 50, tintColor: '#222'}}/>
                    : <Spinner />
                }
            </PlayCircle>
            {!loading && <>
                <Text
                    ellipsizeMode='tail' numberOfLines={1}
                    style={{
                        marginTop: 10,
                        flex: 1,
                        width: '100%',
                        marginBottom: 5,
                    
                }}>{music.title}</Text>
                <Muted
                    ellipsizeMode='tail' numberOfLines={1}
                >{music.composer}</Muted>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 10,
                }}>
                    {music.license_url && <Button onPress={() => Linking.openURL(music.license_url)} 
                        style={{marginRight: music.license_type ? 5 : 1}} 
                        appearance='ghost'size='small'
                    >
                        Source
                    </Button>}
                    {music.license_type && <Button onPress={() => Linking.openURL(music.license_type)} style={styles.button} appearance='ghost'size='small'>
                        License
                    </Button>}
                </View>
                </>}
        </Wrapper>
    )
}

const MusicButton = props => {
    const [visible, setVisible] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [music, setMusic] = React.useState({});
    const soundObject = new Audio.Sound();

    console.log(soundObject);
    useEffect(() => {
    }, [])

    useEffect(() => {
        setLoading(true)
        getMusicByTag(props.tag).then(res => {
            setMusic(res.data)
            setLoading(false)
        })
    }, [props.tag])

    const renderToggleButton = () => (
        <SButton onPress={() => setVisible(true)}>
            <Icon name='music' style={{zIndex: 9999, width: 25, height: 25, tintColor: '#222'}}/>
        </SButton>
    );

    return (<>

        <Popover
            backdropStyle={styles.backdrop}
            visible={visible}
            placement='top end'
            anchor={renderToggleButton}
            style={{
                marginBottom: 10,
                borderRadius: 20,
            }}
            onBackdropPress={() => setVisible(false)}>
            <Layout style={styles.content}>
                <Heading>Soundtrack</Heading>
                <Subheading>Tap on the play to start soundtrack.</Subheading>
                <PlayDetails soundObject={soundObject} music={music} loading={loading} />
            </Layout>
        </Popover>
    </>)
}

export default connect(state => ({tag: state.posts.activeTag}))(MusicButton)

const styles = StyleSheet.create({
    content: {
      flexDirection: 'column',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderRadius: 20,
      width: 300,
    },
    avatar: {
      marginHorizontal: 4,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});