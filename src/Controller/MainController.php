<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Psr\Log\LoggerInterface;

/* for fast implementation, all functions are created in 1 controller
todo: remove logger in production */

class MainController extends Controller
{

    /**
     * @Route("/", name="index")
    */

    public function index()
    {
        return $this->redirectToRoute('login');
    }

    /**
     * @Route("/home", name="home")
     */
    public function home()
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $user = $this->getUser()->getUsername();
        return $this->render('home/Home.html.twig', array(
            'user' => $user
        ));
    }

    /**
     * @Route("/marker", name="marker")
     */
    public function changeMarker(Request $req, LoggerInterface $logger)
    {
        $iconBase = $this->get('kernel')->getProjectDir() . '/assets/img/ggmMarker/';
        $iconsName = scandir($iconBase);

        $r_icon = json_decode($req->getContent(), true);

        // iconName = blue_MarkerA.png for exp
        $selected_icon = array_filter(
            $iconsName,
            function ($iconName, $key) use ($r_icon) {
                return((strpos($iconName, $r_icon["icon"]) !== false) && (strpos($iconName, $r_icon["color"]) !== false));
            },
            ARRAY_FILTER_USE_BOTH
        );

        /* the returned key from selected icon is hard to deal with
         so using this dirty solution */
        foreach ($selected_icon as $value) {
            $icon_url = $value;
        }

        return new Response($icon_url);
    }

    /**
     * @Route("/distance", name="distance")
     */
    public function getDistance(Request $req, LoggerInterface $logger)
    {
        $r_data = json_decode($req->getContent(), true);

        $lat1 = $r_data["from"]["lat"];
        $lng1 = $r_data["from"]["lng"];
        $lat2 = $r_data["to"]["lat"];
        $lng2 = $r_data["to"]["lng"];

        /** reference
        * https://stackoverflow.com/a/12294015
        */

        $url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=".$lat1.",".$lng1."&destinations=".$lat2.",".$lng2."&key=AIzaSyBuN1uGu3IrK66ijGV2jk4d_xEJhAlYzH0";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response = curl_exec($ch);
        curl_close($ch);
        $resp = json_decode($response);
    
        $logger->critical(print_r($response, true));
        return new Response($response);
    }
}
