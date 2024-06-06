<?php
require 'controllers/CalendarController.php';
require 'services/GoogleCalendarService.php';

class Bootstrap
{
    private Google_Client $client;
    function init()
    {
        $this->client = new Google_Client();
        $this->client->setApplicationName('My PHP Calendar Integration');
        $this->client->setScopes(['https://www.googleapis.com/auth/calendar']);
        $this->client->setAuthConfig('calendar_key.json');
    }

    function checkAccess()
    {
        if (!isset($_SESSION['access_token']) && !isset($_GET['code'])) {
            $auth_url = $this->client->createAuthUrl();
            header('Location: ' . filter_var($auth_url, FILTER_SANITIZE_URL));
            return false;
        }
        if (isset($_GET['code'])) {
            $this->client->authenticate($_GET['code']);
            $_SESSION['access_token'] = $this->client->getAccessToken();
            header("Location: index.php");
            return false;
        }

        $this->client->setAccessToken($_SESSION['access_token']);
        return true;
    }

    function route()
    {

        if ($_SERVER["PATH_INFO"] === "/api") {
            $controller = new CalendarController(new GoogleCalendarService($this->client));
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                return $controller->createEventHandler();
            } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
                return $controller->getEventListHandler();
            } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
                return $controller->deleteEventHandler();
            }
        } elseif($_SERVER["PATH_INFO"] === "/logout") {
            session_destroy();
            return;
        }
        include "index.html";
    }

    function run()
    {
        $this->init();

        if (!$this->checkAccess()) {
            exit();
        }
        return $this->route();
    }
}
