import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://paper-ai-backend.onrender.com/api/evaluation-results';

const DashboardScreen = ({route}) => {
  const { token, rollNo } = route.params;
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [recentlyCorrectedSheets, setRecentlyCorrectedSheets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await fetch(API_URL);
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // const data = await response.json();

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      // const response = await fetch(`${API_URL}/results/${rollNo}`, requestOptions);
      // const result = await response.json();
      const response = {};
      let  data = {
        "user": {
          "name": "John Doe",
          "profilePicture": "https://randomuser.me",
          "class": "10th",
        },
        "recentlyCorrectedSheets": [
          {
            "id": 1,
            "name": "Formative Assessment 1",
            "subject": "Mathematics",
            "date": "2021-09-01"
          },
          {
            "id": 2,
            "name": "Formative Assessment 1",
            "subject": "Science",
            "date": "2021-09-03"
          },
          {
            "id": 3,
            "name": "Formative Assessment 1",
            "subject": "English",
            "date": "2021-09-05"
          }
        ]
      }
      if (response.ok) {
        data.user.profilePicture = `data:image/jpeg;base64,${result.photo.data}`;
        data.user.name = result.name;
        data.user.class = result.class;
        data.scannedPdf = `data:image/jpeg;base64,${result.scannedPdf.data}`;
      }
      
      setUserData(data.user);
      setRecentlyCorrectedSheets(data.recentlyCorrectedSheets);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch data. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSheetPress = (sheet, pdf) => {
    navigation.navigate('ExamDetails', { sheetId: sheet.id, scannedPdf: pdf });
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
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Paper AI Academy</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.greeting}>Hi {userData?.name},</Text>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: userData?.profilePicture }}
            style={styles.profilePicture}
          />
          <View>
            <Text style={styles.name}>{userData?.name}</Text>
            <Text style={styles.classInfo}>Class: {userData?.class}</Text>
          </View>
        </View>
        <View style={styles.recentlyCorrectSection}>
          <Text style={styles.sectionTitle}>Recently Corrected</Text>
          <View style={styles.sheetsList}>
            {recentlyCorrectedSheets.map((sheet) => (
              <TouchableOpacity
                key={sheet.id}
                style={styles.sheetItem}
                onPress={() => handleSheetPress(sheet, userData?.scannedPdf)}
              >
                <View style={styles.sheetIcon}>
                  <Text style={styles.sheetIconText}>{sheet.subject[0]}</Text>
                </View>
                <View style={styles.sheetInfo}>
                  <Text style={styles.sheetName}>{sheet.name}</Text>
                  <Text style={styles.sheetSubject}>{sheet.subject}</Text>
                </View>
                <Text style={styles.sheetDate}>{sheet.date}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#4A0E4E',
    padding: 15,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  classInfo: {
    fontSize: 16,
  },
  subject: {
    fontSize: 16,
  },
  recentlyCorrectSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sheetsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  sheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sheetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  sheetIconText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sheetInfo: {
    flex: 1,
  },
  sheetName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sheetSubject: {
    fontSize: 14,
    color: '#666666',
  },
  sheetDate: {
    fontSize: 14,
    color: '#666666',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4A0E4E',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default DashboardScreen;