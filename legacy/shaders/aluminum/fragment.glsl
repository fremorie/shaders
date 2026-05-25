precision mediump float;

uniform mat4 viewMatrix;
uniform vec3 uMaterialColor;
uniform vec3 uSpecularColor;
uniform vec3 uLightDirection;
uniform vec3 uDirLightColor;
uniform float uKd;
uniform float uKs;
uniform float shininess;
uniform float uGroove;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

void main() {
    gl_FragColor = vec4( 0.2, 0.2, 0.5, 1.0 );

    vec3 lightDir = normalize(-uLightDirection);
    vec3 normal = normalize( vNormal );

    for ( int i = 0; i < 2; i++) {
        vec3 offset = (i==0) ? vWorldPosition : -vWorldPosition;
        offset.y = 0.0;
        vec3 jiggledNormal = normalize(normal + uGroove * normalize( offset ));

        float diffuse = max(dot( jiggledNormal, lightDir ), 0.0);
        gl_FragColor.rgb += 0.5 * uKd * uMaterialColor * uDirLightColor * diffuse;

        vec3 viewPosition = normalize(vViewPosition);
        vec3 pointHalfVector = normalize(lightDir + viewPosition);
        float pointDotNormalHalf = max( dot(jiggledNormal, pointHalfVector), 0.0 );
        float specular = uKs * pow( pointDotNormalHalf, shininess );
        specular *= diffuse * (2.0 + shininess) / 8.0;

        if (diffuse <= 0.0) {
            specular = 0.0;
        }

        gl_FragColor.rgb += 0.5 * uDirLightColor * uSpecularColor * specular;
    }
}