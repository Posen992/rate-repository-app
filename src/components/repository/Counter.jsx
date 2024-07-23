import { Text, View, StyleSheet } from 'react-native'
import theme from '../../theme'

const styles = StyleSheet.create({
	flexContainer: {
		flexDirection: 'row',
		margin: 15,
	},

    count: {
		fontWeight: 'bold',
		textAlign: 'center',
        marginBottom : 10,
	},

	title: {
		color: theme.colors.darkgray,
		textAlign: 'center',
	},
})

const Counter = ({ title, count }) => {
	return (
		<View>
			<Text style={styles.count}>{count}</Text>
			<Text style={styles.title}>{title}</Text>
		</View>
	)
}

export default Counter
