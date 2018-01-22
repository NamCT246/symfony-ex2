<?php

namespace App\Controller;

use App\Entity\Marker;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Psr\Log\LoggerInterface;

class MarkerController extends Controller
{
    /**
     * @Route("/marker/type", name="marker_type")
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
     * @Route("/marker/add", name="marker_add")
    */

    public function addMarker(Request $request, LoggerInterface $logger)
    {
        $req_data = json_decode($request->getContent(), true);

        $lng = $req_data["lng"];
        $lat = $req_data["lat"];
        $content = $req_data["content"];
        $type = $req_data["icon"];
        $user = $this->getUser();

        $marker = new Marker();
        $marker->setLng($lng);
        $marker->setLat($lat);
        $marker->setType($type);
        $marker->setContent($content);
        $marker->setUser($user);

        $em = $this->getDoctrine()->getManager();
        $em->persist($marker);
        $em->flush();

        $marker_lng = $marker->getLng();
        $marker_lat = $marker->getLat();
        $marker_content = $marker->getContent();
        $marker_type = $marker->getType();
        $marker_id = $marker->getId();

        $response = array(
          'id' => $marker_id,
          'lng' => $marker_lng,
          'lat' => $marker_lat,
          'content' => $marker_content,
          'type' => $marker_type
        );
        
        return new JsonResponse($response);
    }

    /**
    * @Route("/marker/content/{id}", name="marker_content")
    */

    public function changeMarkerContent($id, Request $request, LoggerInterface $logger)
    {
        $req_data = json_decode($request->getContent(), true);

        $em = $this->getDoctrine()->getManager();
        $marker = $em->getRepository(Marker::class)->find($id);

        if (!$marker) {
            throw $this->createNotFoundException(
              'No marker found'
          );
        }

        $marker->setContent($req_data["content"]);

        // no need to call persist, doctrine watches the object
        $em->flush();

        $marker_lng = $marker->getLng();
        $marker_lat = $marker->getLat();
        $marker_content = $marker->getContent();
        $marker_type = $marker->getType();
        $marker_id = $marker->getId();

        $response = array(
          'id' => $marker_id,
          'lng' => $marker_lng,
          'lat' => $marker_lat,
          'content' => $marker_content,
          'type' => $marker_type
        );
        
        return new JsonResponse($response);
    }

    /**
    * @Route("/markers/load", name="markers_load")
    */

    public function loadMarkers(Request $request, LoggerInterface $logger)
    {
        $em = $this->getDoctrine()->getManager();
        $markers = $em->getRepository(Marker::class)->getAllMarkers();

        return new JsonResponse($markers);
    }
}
