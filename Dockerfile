FROM ubuntu:latest AS build
RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
RUN apt-get install nodejs -y
COPY frontend frontend
COPY springBackend springBackend
RUN cd ./frontend && npm install && npm run build;
RUN cd ../springBackend; ./gradlew bootJar

FROM openjdk:17-jdk-slim
EXPOSE 8080
COPY --from=build /build/libs/demo-1.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]