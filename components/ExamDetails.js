import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Dimensions,
} from "react-native";

// import Pdf from "react-native-pdf";

const API_URL = "https://paper-aibackend.onrender.com/api/evaluation-results";

const ExamDetails = ({ route, navigation }) => {
  console.log(route.params);
  const { sheetId, scannedPdf } = route.params;
  const [examData, setExamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfVisible, setPdfVisible] = useState(false);

  useEffect(() => {
    fetchExamDetails();
  }, []);

  const handleViewAnswerPaper = () => {
    setPdfVisible(true);
  };

  const fetchExamDetails = async () => {
    try {
      // const response = await fetch(`${API_URL}/${sheetId}`);
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // const data = await response.json();
      console.log(sheetId);
      let data = {};
      if (sheetId == 1) {
        data = {
          examName: "Sample Exam 1",
          grade: "10th",
          subject: "Mathematics",
          examCode: "MATH-101",
          mark: 80,
          totalMarks: 100,
          classAverage: 75,
          expertCount: 5,
          expertQuestions: [1, 2, 3, 4, 5],
          intermediateCount: 10,
          intermediateQuestions: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          noviceCount: 5,
          noviceQuestions: [16, 17, 18, 19, 20],
        };
      } else if (sheetId == 2) {
        data = {
          examName: "Sample Exam 2",
          grade: "10th",
          subject: "Science",
          examCode: "SCI-101",
          mark: 60,
          totalMarks: 100,
          classAverage: 55,
          expertCount: 3,
          expertQuestions: [1, 2, 3],
          intermediateCount: 7,
          intermediateQuestions: [4, 5, 6, 7, 8, 9, 10],
          noviceCount: 5,
          noviceQuestions: [11, 12, 13, 14, 15],
        };
      } else if (sheetId == 3) {
        data = {
          examName: "Sample Exam 3",
          grade: "10th",
          subject: "English",
          examCode: "ENG-101",
          mark: 40,
          totalMarks: 100,
          classAverage: 45,
          expertCount: 2,
          expertQuestions: [1, 2],
          intermediateCount: 5,
          intermediateQuestions: [3, 4, 5, 6, 7],
          noviceCount: 3,
          noviceQuestions: [8, 9, 10],
        };
      }
      setExamData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch exam details. Please try again.");
      setIsLoading(false);
    }
  };

  const renderQuestionButtons = (questions, color) => {
    return questions.map((num) => (
      <View
        key={num}
        style={[styles.questionButton, { backgroundColor: color }]}
      >
        <Text style={styles.questionButtonText}>{num}</Text>
      </View>
    ));
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A0E4E" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchExamDetails}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{examData.examName}</Text>
        <View style={styles.headerTags}>
          <Text style={styles.headerTag}>{examData.grade}</Text>
          <Text style={styles.headerTag}>{examData.subject}</Text>
        </View>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.examInfo}>
          <View style={styles.examInfoLeft}>
            <Text style={styles.examInfoText}>{examData.grade}</Text>
            <Text style={styles.examInfoText}>{examData.subject}</Text>
            <Text style={styles.examInfoText}>{examData.examCode}</Text>
          </View>
          <View style={styles.examInfoRight}>
            <Text style={styles.markLabel}>Mark</Text>
            <Text style={styles.markValue}>
              {examData.mark} / {examData.totalMarks}
            </Text>
            <Text style={styles.classAvg}>
              Class Avg - {examData.classAverage}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Expert [{examData.expertCount}] (80-100%)
            <Text style={styles.viewQuestions} View Questions></Text>
          </Text>
          <View style={styles.questionContainer}>
            {renderQuestionButtons(examData.expertQuestions, "#4CAF50")}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Intermediate [{examData.intermediateCount}] (40-79%)
          </Text>
          <View style={styles.questionContainer}>
            {renderQuestionButtons(examData.intermediateQuestions, "#FFA500")}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Novice [{examData.noviceCount}] (0-39%)
            <Text style={styles.viewQuestions} View Questions></Text>
          </Text>
          <View style={styles.questionContainer}>
            {renderQuestionButtons(examData.noviceQuestions, "#F44336")}
          </View>
        </View>

        <TouchableOpacity
          style={styles.viewAnswerButton}
          onPress={handleViewAnswerPaper}
        >
          <Text style={styles.viewAnswerButtonText}>View Answer Paper</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        visible={pdfVisible}
        onRequestClose={() => setPdfVisible(false)}
        animationType="slide"
      >
        <SafeAreaView style={styles.pdfContainer}>
          <TouchableOpacity
            style={styles.closePdfButton}
            onPress={() => setPdfVisible(false)}
          >
            <Text style={styles.closePdfButtonText}>Close</Text>
          </TouchableOpacity>
          {/* <Pdf source={{ uri: scannedPdf }} style={styles.pdf} /> */}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#4A0E4E",
    padding: 15,
  },
  backButton: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  headerTags: {
    flexDirection: "row",
    marginTop: 5,
  },
  headerTag: {
    color: "#FFFFFF",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
  },
  content: {
    padding: 20,
  },
  examInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  examInfoLeft: {
    flex: 1,
  },
  examInfoRight: {
    alignItems: "flex-end",
  },
  examInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  markLabel: {
    fontSize: 14,
    color: "#666",
  },
  markValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  classAvg: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  viewQuestions: {
    color: "#4A0E4E",
    fontSize: 14,
    marginLeft: 10,
  },
  questionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  questionButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 15,
  },
  questionButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  viewAnswerButton: {
    backgroundColor: "#4A0E4E",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  viewAnswerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#4A0E4E",
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  closePdfButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  closePdfButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ExamDetails;
