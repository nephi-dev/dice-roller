import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { DiceChartType } from "../../types/general";

type ChartProps = {
    diceBase: DiceChartType;
};

const DiceChart = ({ diceBase }: ChartProps) => {
    const [diceSides, setDiceSides] = useState(diceBase.diceSides);
    const [amount, setAmount] = useState(diceBase.amount);
    const [plusValue, setPlusValue] = useState(diceBase.plusValue);
    const [sumPlusValueWhere, setSumPlusValueWhere] = useState(
        diceBase.sumPlusValueWhere
    );
    const [rolls, setRolls] = useState<number[]>([]);
    const [total, setTotal] = useState(0);

    const setColorsForWhere = (where: "perDice" | "total") => {
        if (sumPlusValueWhere === where) {
            return {
                backgroundColor: "#06d6a0",
            };
        }
        return {
            backgroundColor: "#fff",
        };
    };

    const rollDice = () => {
        // will roll the dice and return the sum of the rolls
        setRolls([]);
        const _rolls: number[] = [];
        for (let i = 0; i !== amount; i++) {
            _rolls.push(Math.floor(Math.random() * diceSides) + 1);
        }
        setRolls(_rolls);
        if (sumPlusValueWhere === "perDice") {
            setTotal(
                _rolls.reduce((acc, curr) => {
                    return acc + curr + plusValue;
                }, 0)
            );
        } else {
            setTotal(
                _rolls.reduce((acc, curr) => {
                    return acc + curr;
                }, 0) + plusValue
            );
        }
    };

    const canRoll = () => {
        return diceSides > 0 && amount > 0;
    };

    const changeDiceSides = (newDiceSides: number) => {
        setRolls([]);
        setDiceSides(newDiceSides);
    };

    const changeAmount = (newAmount: number) => {
        setRolls([]);
        setAmount(newAmount);
    };

    const changePlusValue = (newPlusValue: number) => {
        setRolls([]);
        setPlusValue(newPlusValue);
    };

    return (
        <>
            <View style={DiceChartStyles.mainContainer}>
                <View style={DiceChartStyles.headerRowContainer}>
                    <Text style={DiceChartStyles.label}>
                        {diceSides
                            ? `Rodar um D${diceSides}`
                            : "Você precisa selecionar qual dado quer rodar"}
                    </Text>
                </View>
                <View style={DiceChartStyles.rowContainer}>
                    <Text style={DiceChartStyles.label}>Rodando</Text>
                    <TextInput
                        style={DiceChartStyles.input}
                        keyboardType="numeric"
                        onChangeText={(text) => changeAmount(Number(text))}
                        value={amount.toString()}
                    />
                    <Text style={DiceChartStyles.label}>
                        dado{amount > 1 ? "s" : null} D
                    </Text>
                    <TextInput
                        style={DiceChartStyles.input}
                        keyboardType="numeric"
                        onChangeText={(text) => changeDiceSides(Number(text))}
                        value={diceSides.toString()}
                    />
                </View>
                <View style={DiceChartStyles.rowContainer}>
                    <Text style={DiceChartStyles.label}>Somar</Text>
                    <TextInput
                        style={DiceChartStyles.input}
                        keyboardType="numeric"
                        onChangeText={(text) => changePlusValue(Number(text))}
                        value={plusValue.toString()}
                    />
                    <View style={DiceChartStyles.plusChoiceContainer}>
                        <TouchableOpacity
                            style={{
                                ...DiceChartStyles.plusChoiceButton,
                                ...setColorsForWhere("perDice"),
                            }}
                            onPress={() => setSumPlusValueWhere("perDice")}
                        >
                            <Text
                                style={{
                                    ...DiceChartStyles.plusChoiceText,
                                    color:
                                        sumPlusValueWhere === "perDice"
                                            ? "#fff"
                                            : "#06d6a0",
                                }}
                            >
                                Por Dado
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                ...DiceChartStyles.plusChoiceButton,
                                ...setColorsForWhere("total"),
                            }}
                            onPress={() => setSumPlusValueWhere("total")}
                        >
                            <Text
                                style={{
                                    ...DiceChartStyles.plusChoiceText,
                                    color:
                                        sumPlusValueWhere === "total"
                                            ? "#fff"
                                            : "#06d6a0",
                                }}
                            >
                                Ao Total
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={DiceChartStyles.rowContainer}>
                    {canRoll() ? (
                        <TouchableOpacity
                            style={DiceChartStyles.rollButton}
                            onPress={rollDice}
                        >
                            <Text style={DiceChartStyles.rollButtonText}>
                                Rolar
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={DiceChartStyles.cantRollContainer}>
                            <Text style={DiceChartStyles.cantRollMessage}>
                                Só é possivel rolar com pelo menos um dado
                            </Text>
                        </View>
                    )}
                </View>
            </View>
            {rolls.length > 0 ? (
                <View style={DiceChartStyles.rollsContainer}>
                    {rolls.map((roll, index) => (
                        <View key={index} style={DiceChartStyles.rollContainer}>
                            <Text style={DiceChartStyles.rollText}>{roll}</Text>
                        </View>
                    ))}
                    {plusValue ? (
                        sumPlusValueWhere === "total" ? (
                            <>
                                <Text>+</Text>
                                <View style={DiceChartStyles.rollContainer}>
                                    <Text style={DiceChartStyles.rollText}>
                                        {plusValue | 0}
                                    </Text>
                                </View>
                            </>
                        ) : (
                            <>
                                <Text>+</Text>
                                <View style={DiceChartStyles.rollContainer}>
                                    <Text style={DiceChartStyles.rollText}>
                                        {(plusValue | 0) * rolls.length}
                                    </Text>
                                </View>
                            </>
                        )
                    ) : null}
                </View>
            ) : null}
            <View style={DiceChartStyles.totalContainer}>
                <Text style={DiceChartStyles.totalText}>Total: {total}</Text>
            </View>
        </>
    );
};

const DiceChartStyles = StyleSheet.create({
    mainContainer: {
        width: "90%",
        height: 240,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#06d6a0",
        borderRadius: 8,
        padding: 8,
        marginTop: 64,
    },

    rowContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    headerRowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "80%",
    },

    label: {
        textAlign: "center",
        fontSize: 20,
    },

    input: {
        textAlign: "center",
        fontSize: 20,
        backgroundColor: "#e4e4e4",
        color: "#000",
        marginHorizontal: 4,
        borderRadius: 8,
    },

    rollButton: {
        width: 120,
        backgroundColor: "#06d6a0",
        padding: 4,
        borderRadius: 8,
    },

    rollButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 20,
    },

    plusChoiceContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },

    plusChoiceButton: {
        backgroundColor: "#e4e4e4",
        padding: 4,
        borderRadius: 8,
        marginHorizontal: 4,
    },

    plusChoiceText: {
        textAlign: "center",
        fontSize: 20,
    },

    cantRollContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 280,
        backgroundColor: "#ef476f",
        padding: 4,
        borderRadius: 8,
    },

    cantRollMessage: {
        textAlign: "center",
        fontSize: 20,
        color: "#fff",
    },

    rollsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    rollContainer: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#06d6a0",
        borderRadius: 8,
        marginTop: 8,
    },

    rollText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 20,
    },

    totalContainer: {
        marginTop: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        backgroundColor: "#06d6a0",
        borderRadius: 8,
        padding: 4,
    },

    totalText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 20,
    },
});

export default DiceChart;
