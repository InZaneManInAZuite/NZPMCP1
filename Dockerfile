FROM ubuntu:latest AS build
RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
RUN apt-get install -y nodejs \
npm
COPY frontend frontend
COPY springBackend springBackend
COPY /frontend/package.json /frontend/
WORKDIR /frontend
RUN npm install
RUN npm run build
WORKDIR /springBackend
RUN ./gradlew bootJar

FROM openjdk:17-jdk-slim
WORKDIR /
EXPOSE 8080
COPY --from=build springBackend/build/libs/demo-1.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]