import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Text } from "react-native";
import DiceChart from "./components/DiceChart/index";
import { DiceChartType } from "./types/general";

export default function App() {
    const [dices, setDices] = useState<DiceChartType[]>([]);

    const populateDices = () => {
        const commonDices = [4, 6, 8, 10, 12, 20];
        const _dices: DiceChartType[] = [];
        for (let i = 0; i < commonDices.length; i++) {
            _dices.push({
                diceSides: commonDices[i],
                amount: 1,
                plusValue: 0,
                sumPlusValueWhere: "total",
            });
        }

        setDices(_dices);
    };

    useEffect(() => {
        populateDices();
    }, []);
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="auto" />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Rolador de Dados</Text>
            </View>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.container}
            >
                {dices.map((dice, index) => (
                    <DiceChart key={index} diceBase={dice} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        backgroundColor: "#06d6a0",
        textAlign: "center",
        padding: 8,
        borderRadius: 8,
        marginTop: 80,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },

    safeArea: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    scroll: {
        width: "100%",
        marginBottom: 8,
    },

    container: {
        justifyContent: "center",
        alignItems: "center",
    },
});
