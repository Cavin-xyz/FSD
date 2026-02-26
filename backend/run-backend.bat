@echo off
REM Run Vaux Spring Boot Backend
REM This script starts the Spring Boot application

cls
echo.
echo ================================================
echo  Vaux Backend - Spring Boot
echo ================================================
echo.
echo Starting application...
echo.

cd /d "C:\Users\cavin\FSD\backend"

REM Set Maven and Java paths
set MAVEN_PATH=C:\tools\apache-maven-3.9.12\bin
set JAVA_HOME=C:\Program Files\Java\jdk-24

REM Run Spring Boot
echo Running: %MAVEN_PATH%\mvn spring-boot:run
echo.
%MAVEN_PATH%\mvn spring-boot:run

pause
