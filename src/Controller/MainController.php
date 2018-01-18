<?php

namespace App\Controller;

use App\Entity\Map;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Psr\Log\LoggerInterface;

class MainController extends Controller
{
    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        $welcome = "Hello World";
        return $this->render('home/home.html.twig', [
          'welcome'=> $welcome
       ]);
    }

    /**
     * @Route("/marker/default", name="marker_default")
     */

    public function changeMarkerType(Request $req)
    {
        $iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
        $icons = array(
            "Parking"=> $iconBase."parking_lot_maps.png",
            "Library"=> $iconBase."library_maps.png",
            "Info"=>$iconBase."info-i_maps.png"
        );
        $requested_icon = json_decode($req->getContent(), true);
        $selected_icon;

        foreach ($icons as $key => $icon) {
            if ($requested_icon["icon"] === $key) {
                $res = new Response($icon);
                $selected_icon = $key;
                return $res;
            }
        }

        return $this->render('home', [
            'marker'=> '$selected_icon'
        ]);
    }
}
