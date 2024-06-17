<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class AddressController extends Controller
{
    public function getAddress(Request $request)
    {
        $zipcode = $request->input('zipcode');
        $client = new Client();
        $response = $client->get('https://zip-cloud.appspot.com/api/search', [
            'query' => ['zipcode' => $zipcode]
        ]);
        $addressData = json_decode($response->getBody()->getContents(), true);

        if ($addressData['results']) {
            $result = $addressData['results'][0];
            $address = [
                'prefecture' => $result['address1'],
                'city' => $result['address2'],
                'town' => $result['address3']
            ];
        } else {
            $address = [
                'prefecture' => '',
                'city' => '',
                'town' => ''
            ];
        }

        return response()->json($address);
    }
}
