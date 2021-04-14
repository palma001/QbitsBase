<GmapMap
    ref="mymap"
    map-type-id="roadmap"
    style="width: 100%; height: 70vh"
    :center="{ lat: 10.196248389913245, lng: -64.62544711587066 }"
    :zoom="8"
    >
    <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
    />
</GmapMap>



<q-input label="Ciudad" dense>

 <q-btn
    color="primary"
    text-color="white"
    size="xs"
    icon="add"
    aria-label="add"
    round
>
</q-btn>
<q-btn
    color="negative"
    text-color="white"
    size="xs"
    icon="delete"
    aria-label="trash"
    round
>
</q-btn>
