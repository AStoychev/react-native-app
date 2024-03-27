import { useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/Goalitem';
import GoalInput from './components/Goalinput';

export default function App() {
    const [modalIsVidible, setModalIsVisible] = useState(false);
    const [courseGoals, setCourseGoals] = useState([]);

    function startAddGoalHandler() {
        setModalIsVisible(true);
    }

    function endAddGoalHandler() {
        setModalIsVisible(false);
    }

    function addGoalHandler(enteredGoalText) {
        setCourseGoals(currentCourseGoals => [
            ...currentCourseGoals,
            { text: enteredGoalText, id: Math.random().toString() },
        ]);
        endAddGoalHandler()
    };

    function deleteGoalHandler(id) {
        setCourseGoals(currentCourseGoals => {
            return currentCourseGoals.filter((goal) => goal.id !== id);
        })
    }

    return (
        <>
            <StatusBar style="light"/>
            <View style={styles.appContainer}>
                <Button
                    title="Add New Goal"
                    color="#a065ec"
                    onPress={startAddGoalHandler}
                />
                <GoalInput visible={modalIsVidible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />
                <View style={styles.goalsContainer}>
                    <FlatList
                        data={courseGoals}
                        renderItem={(itemData) => {
                            itemData.index
                            return (
                                <GoalItem
                                    text={itemData.item.text}
                                    id={itemData.item.id}
                                    onDeleteItem={deleteGoalHandler}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => {
                            return item.id;
                        }}
                    >
                    </FlatList>

                    {/* <ScrollView>
                    {courseGoals.map((goal, index) => (
                        <View style={styles.goalItem} key={`${goal}${index}`}>
                            <Text style={styles.goalText}>{goal}</Text>
                        </View>
                    ))}
                </ScrollView> */}
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        padding: 50,
        paddingHorizontal: 16,
    },
    goalsContainer: {
        flex: 5
    }
});
