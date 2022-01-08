import React from 'react';
import {View, Text, Modal, Dimensions, StyleSheet,  Easing, Animated, TouchableHighlight, StatusBar} from 'react-native';
import Colors from './../utils/Colors.js';
import isTablet from '../utils/isTablet.js';
import FontStyles from '../utils/FontStyles.js';
import { BlurView } from 'expo-blur';

export default class Alert extends React.Component {
	constructor(props){
		super(props);

    this.opacityValue = new Animated.Value(1);

		this.state = {
			modalOpen: false,
			title: "",
			body: "",
			buttonInfo: [],
			imgIndex: 0,
    }
	}

	closeModal() {
		this.setState({
			title: "",
			body: "",
			modalOpen: false,
		});
	}

	showAlert = (title, body, buttonInfo) => {
		this.setState({
			title: title,
			body: body,
      buttonInfo: buttonInfo,
			modalOpen: true,
		})
	}


	render(){
		return (
			<Modal  
				onRequestClose={() => this.setState({modalOpen: false})}
				animationType="fade" 
				visible={this.state.modalOpen} 
				transparent
				translucent
				statusBarTranslucent
			>	
			<StatusBar translucent animated backgroundColor={"transparent"}/>
				<BlurView intensity={100} tint={"dark"} style={[styles.container]}>
					<View style={styles.box}>
						<Text style={[isTablet ? FontStyles.headline : FontStyles.body, {color: Colors.secondaryDark.alpha1, marginBottom: isTablet ? 16 : 10, fontWeight: '600'}]}>
							{this.state.title}
						</Text>
						<Text style={[isTablet ? FontStyles.bodyLight : FontStyles.subhead, {color: Colors.secondaryDark.alpha1, textAlign: "center", marginBottom: isTablet ? 20 : 10, marginHorizontal: isTablet ? 20 : 15, lineHeight: isTablet ? 38 : 24}]}>
							{this.state.body}
						</Text>
						{
							this.state.buttonInfo.map((item, index) => {
								return (
									<View style={{alignSelf: 'stretch'}} key={index}>
										<View style={styles.inbetweenLine}/>
										<TouchableHighlight 
											underlayColor="rgba(80,80,80,0.05)"
											style={styles.button} 
											onPress={() => {
												this.closeModal();
												if(item.onPress){
													item.onPress();
												}
										}}>
											<Text style={[FontStyles.body, {color: item.danger ? Colors.red.alpha1 : Colors.secondaryDark.alpha1}]}>
												{item.text}
											</Text>
										</TouchableHighlight>
									</View>
								);
							})
						}
					</View>
				</BlurView>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white.alpha1,
		justifyContent: "center",
		alignItems: 'center'
	},
	box: {
    	paddingTop: isTablet ? 24 : 17.5,
		width: isTablet ? Dimensions.get("window").width*0.5 : Dimensions.get("window").width * 0.8,
		borderRadius: 10,
		alignItems: "center",
		backgroundColor: "white",
		overflow: "hidden"
	},
	inbetweenLine: {
		height: 2,
		width: '100%',
		backgroundColor: Colors.lightGray.alpha1,
	},
	button: {
		alignSelf: 'stretch',
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: isTablet ? 24 : 15
	}
});
