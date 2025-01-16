RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
RUN apt-get install nodejs -y
COPY . .
RUN cd ../frontend
RUN npm install
RUN npm run build
RUN cd ../springBackend
RUN ./gradlew bootJar

RUN ./gradlew bootRun