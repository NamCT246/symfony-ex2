<?php

namespace App\Controller;

use App\Entity\Marker;
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
         so we have to do this dirty solution */
        foreach ($selected_icon as $value) {
            $icon_url = $value;
        }

        return new Response($icon_url);
    }
}
