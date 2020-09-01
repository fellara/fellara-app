import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TouchableOpacity, StyleSheet, View, Linking } from 'react-native'
import { Avatar, Button, Layout, Popover, Icon, Spinner } from '@ui-kitten/components';
import { connect } from 'react-redux'
import { Audio } from 'expo-av';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import layouts, { MAX_WIDTH, POSTS_LIST_PADDING } from '../../constants/layouts'
import { useMediaQuery } from 'react-responsive'

import Text, { Heading, Subheading, Muted } from '../typography'
import { getMusicByTag } from '../../api/musics'
import { changeCurrentMusic } from '../../actions/musics'
import { getFileUrl } from '../../utils'

const SButton = styled(TouchableOpacity)`
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 100px;
    bottom: 65px;
    right: 10px;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 5px #999;
`
const Card = styled(Layout)`
  padding: 15px;
  border-radius: 15px;
  width: 300px;
`
const Wrapper = styled(View)`
    background-color: #eee;
    border-radius: 10px;
    flex: 1;
    width: 100%;
    align-items: center;
    padding: 15px;
    justify-content: center;
`

const PlayCircle = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
`

const PlayButton = ({ onPress, fill, isPlaying, loading, size, width, backgroundColor, ...props }) => {

    return (
        <PlayCircle
            onPress={() => onPress && onPress()}
        >
            <AnimatedCircularProgress
                size={size}
                width={width}
                fill={fill}
                tintColor="rgb(34, 43, 69)"
                backgroundColor={backgroundColor || "#fff"}
                rotation={0}
                lineCap='round'
                childrenContainerStyle={{
                    backgroundColor: backgroundColor || '#fff'
                }}
            >
                {() => (!loading
                    ? !isPlaying
                        ? <Icon name='arrow-right' style={{ zIndex: 9999, width: size * 3 / 5, height: size * 3 / 5, tintColor: 'rgb(34, 43, 69)' }} />
                        : <View style={{ zIndex: 9999, width: size * 3 / 9, height: size * 3 / 9, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ borderRadius: 10, width: size * 3 / 26, backgroundColor: 'rgb(34, 43, 69)' }} />
                            <View style={{ borderRadius: 10, width: size * 3 / 26, backgroundColor: 'rgb(34, 43, 69)' }} />
                        </View>
                    : <Spinner />
                )}
            </AnimatedCircularProgress>
        </PlayCircle>
    )
}

let soundObject = {}
const MusicButton = props => {
    const [visible, setVisible] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [music, setMusic] = React.useState({});
    const [status, setStatus] = useState({})
    let audio = null

    useEffect(() => {
        soundObject = new Audio.Sound();
    }, [])

    let tag = null
    tag = props.tags?.find(t => t.id === parseInt(props.tag))
    let prevTag = null
    prevTag = props.tags?.find(t => t.id === parseInt(props.prevMusic?.tag))

    const handlePlay = async () => {
        if (!props.prevMusic?.tag || (props.tag === props.prevMusic?.tag)) {
            handlePlayPause()
        } else {
            await soundObject.pauseAsync();
            await soundObject.unloadAsync();
            console.log(status.isPlaying, status.isLoaded);
            handlePlayPause(true)
        }
    }

    const handlePlayPause = async (newMusic) => {
        if (status.isPlaying && status.isLoaded && !newMusic) {
            await soundObject.pauseAsync();
        } else {
            try {
                if (!status.isLoaded || newMusic) {
                    props.changeCurrentMusic({...music, tag: props.tag})
                    await soundObject.loadAsync({ uri: getFileUrl(music.music_file) })
                    await soundObject.setOnPlaybackStatusUpdate(setStatus);
                }
                await soundObject.playAsync();
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        setLoading(true)
        getMusicByTag(props.tag).then(res => {
            setMusic(res.data)
            console.log(res.data);
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }, [props.tag])

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })

    const style = isDesktopOrLaptop ? {
        marginRight: (layouts.window.width - MAX_WIDTH) / 2 + 10
    } : {}

    const renderToggleButton = () => (
        <SButton onPress={() => setVisible(true)}
            style={{
                ...style
            }}
        >
            <Icon name='music' style={{ zIndex: 9999, width: 25, height: 25, tintColor: '#222' }} />
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
                backgroundColor: 'transparent',
                border: 'none',
            }}
            onBackdropPress={() => setVisible(false)}>
            <View style={styles.content}>
                {props.prevMusic && (props.tag !== props.prevMusic?.tag) && <Card style={{
                    marginBottom: 10,
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    alignItems: 'center',
                }}>
                    <PlayButton
                        // onPress={handlePlay}
                        fill={status.durationMillis
                            ? status.positionMillis / status.durationMillis !== 0
                                ? status.positionMillis / status.durationMillis * 100
                                : 0
                            : 0}
                        size={30}
                        width={2}
                        loading={loading}
                        isPlaying={status.isPlaying}
                        backgroundColor='#eee'
                    />
                    <View style={{
                        marginLeft: 15,
                        flex: 1,
                    }}>
                        <Text
                            ellipsizeMode='tail' numberOfLines={1}
                            style={{
                                flex: 1,
                                width: '100%',
                                marginBottom: 5,
                            }}>{props.prevMusic.title}
                        </Text>
                        <Muted
                            ellipsizeMode='tail' numberOfLines={1}
                        >{props.prevMusic.composer}</Muted>
                    </View>
                </Card>}

                <Card>
                    <Heading style={{
                        // borderTopColor: '#eee',
                        // borderTopWidth: 1,
                        // paddingTop: 5,
                    }}>Soundtrack</Heading>
                    <Subheading>Tap on the play to start {tag?.title}'s Soundtrack</Subheading>
                    <Wrapper style={{
                        marginTop: 10,
                    }}>
                        <PlayButton
                            onPress={handlePlay}
                            fill={(props.tag === props.prevMusic?.tag) ? status.durationMillis
                                ? status.positionMillis / status.durationMillis !== 0
                                    ? status.positionMillis / status.durationMillis * 100
                                    : 0
                                : 0 : 0}
                            size={80}
                            width={3}
                            loading={loading}
                            isPlaying={status.isPlaying && (props.tag === props.prevMusic?.tag)}
                        />
                        {!loading ? <>
                            <Text
                                ellipsizeMode='tail' numberOfLines={1}
                                style={{
                                    marginTop: 15,
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
                                    style={{ marginRight: music.license_type ? 5 : 1 }}
                                    appearance='ghost' size='small'
                                >
                                    Source
                            </Button>}
                                {music.license_type && <Button onPress={() => Linking.openURL(music.license_type)} style={styles.button} appearance='ghost' size='small'>
                                    License
                            </Button>}
                            </View>
                        </> : null}
                    </Wrapper>
                </Card>
            </View>
        </Popover>
    </>)
}

export default connect(state => ({ 
    tag: state.posts.activeTag, 
    tags: state.initials.tags,
    prevMusic: state.musics.current
}), {
    changeCurrentMusic,
})(MusicButton)

const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
    },
    avatar: {
        marginHorizontal: 4,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});