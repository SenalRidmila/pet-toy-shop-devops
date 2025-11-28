#  openjdk file
FROM eclipse-temurin:17-jdk-alpine

# JAR file
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Run 
ENTRYPOINT ["java","-jar","/app.jar"]